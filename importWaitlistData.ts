import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { db } from './server/db';
import { storage } from './server/storage';
import { 
  InsertWaitlistEntry, 
  waitlistEntries, 
  insertWaitlistEntrySchema,
  InsertGeographicStats,
  InsertReferralChannel,
  InsertDailyWaitlistStats
} from './shared/schema';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { Transform } from 'stream';

// Define a schema for validating CSV records
const csvRecordSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  // Add additional fields as needed
}).transform(data => ({
  email: data.email,
  full_name: data.full_name,
}));

// Define types for our validated and invalid records
type ValidatedRecord = {
  email: string;
  full_name: string;
};

type InvalidRecord = {
  record: any;
  error: string;
};

// Rate limiting variables
const importRateLimit = {
  maxRequests: 100, // Maximum records to process per minute
  windowMs: 60 * 1000, // 1 minute
  counter: 0,
  resetTime: Date.now() + 60 * 1000
};

// Function to check rate limit
function checkRateLimit(): boolean {
  const now = Date.now();
  
  // Reset counter if window has passed
  if (now > importRateLimit.resetTime) {
    importRateLimit.counter = 0;
    importRateLimit.resetTime = now + importRateLimit.windowMs;
  }
  
  // Check if limit exceeded
  if (importRateLimit.counter >= importRateLimit.maxRequests) {
    return false;
  }
  
  importRateLimit.counter++;
  return true;
}

// Constants for bulk operations
const BATCH_SIZE = 100; // Number of records to process in a single batch
const MAX_RECORDS = 10000; // Maximum number of records to process

/**
 * Process a batch of records using bulk insert
 * @param records Array of validated records to insert
 * @returns Object containing success and error counts
 */
async function processBatch(records: ValidatedRecord[]): Promise<{ successCount: number, errorCount: number }> {
  if (records.length === 0) {
    return { successCount: 0, errorCount: 0 };
  }
  
  try {
    // Map records to the format expected by the database
    const entriesToInsert: InsertWaitlistEntry[] = records.map(record => ({
      email: record.email,
      fullName: record.full_name,
      userType: "user" as const,
      // Add any other required fields
    }));
    
    // Use the bulk insert method from storage
    const successCount = await storage.createWaitlistEntryBulk(entriesToInsert);
    
    return {
      successCount,
      errorCount: entriesToInsert.length - successCount
    };
  } catch (error) {
    console.error('Error in bulk insert:', error);
    return {
      successCount: 0,
      errorCount: records.length
    };
  }
}

async function streamImportWaitlistData() {
  console.log('Starting waitlist data import using streaming...');
  
  // Clear existing waitlist data (for demo purposes)
  try {
    await db.execute(sql`TRUNCATE TABLE ${waitlistEntries} RESTART IDENTITY CASCADE`);
    console.log('Cleared existing waitlist entries');
  } catch (error) {
    console.error('Error clearing existing entries:', error);
  }
  
  const csvFilePath = path.join(process.cwd(), 'attached_assets', 'peochain14.03.csv');
  
  // Create a transform stream to validate and process records
  const validationTransform = new Transform({
    objectMode: true,
    transform(record, encoding, callback) {
      try {
        const validatedRecord = csvRecordSchema.parse(record);
        this.push(validatedRecord);
        callback();
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          console.error(`Invalid record: ${JSON.stringify(record)}, Error: ${validationError.message}`);
        } else {
          console.error(`Error validating record: ${JSON.stringify(record)}`);
        }
        // Don't push invalid records to the next stream
        callback();
      }
    }
  });
  
  // Create counters for statistics
  let recordCount = 0;
  let batchCount = 0;
  let totalSuccessCount = 0;
  let totalErrorCount = 0;
  let currentBatch: ValidatedRecord[] = [];
  
  // Create a transform stream to batch records
  const batchTransform = new Transform({
    objectMode: true,
    async transform(record: ValidatedRecord, encoding, callback) {
      // Add record to current batch
      currentBatch.push(record);
      recordCount++;
      
      // Process batch when it reaches the batch size or at the end
      if (currentBatch.length >= BATCH_SIZE || recordCount >= MAX_RECORDS) {
        batchCount++;
        console.log(`Processing batch ${batchCount} with ${currentBatch.length} records...`);
        
        // Apply rate limiting
        if (!checkRateLimit()) {
          console.log('Rate limit reached, pausing import...');
          // Wait until the rate limit window resets
          await new Promise(resolve => setTimeout(resolve, importRateLimit.resetTime - Date.now()));
          console.log('Resuming import...');
        }
        
        // Process the current batch
        const { successCount, errorCount } = await processBatch(currentBatch);
        totalSuccessCount += successCount;
        totalErrorCount += errorCount;
        
        console.log(`Batch ${batchCount} completed: ${successCount} successful, ${errorCount} errors`);
        
        // Reset the batch
        currentBatch = [];
      }
      
      // Stop processing if we've reached the maximum number of records
      if (recordCount >= MAX_RECORDS) {
        console.log(`Reached maximum record count of ${MAX_RECORDS}`);
        this.end();
      }
      
      callback();
    },
    async flush(callback) {
      // Process any remaining records in the final batch
      if (currentBatch.length > 0) {
        batchCount++;
        console.log(`Processing final batch ${batchCount} with ${currentBatch.length} records...`);
        
        const { successCount, errorCount } = await processBatch(currentBatch);
        totalSuccessCount += successCount;
        totalErrorCount += errorCount;
        
        console.log(`Final batch completed: ${successCount} successful, ${errorCount} errors`);
      }
      
      console.log('Import completed!');
      console.log(`Total records processed: ${recordCount}`);
      console.log(`Successfully imported: ${totalSuccessCount} records`);
      console.log(`Errors: ${totalErrorCount} records`);
      
      callback();
    }
  });
  
  // Create the streaming pipeline
  return new Promise<void>((resolve, reject) => {
    const parser = parse({
      columns: true,
      skip_empty_lines: true
    });
    
    createReadStream(csvFilePath)
      .pipe(parser)
      .pipe(validationTransform)
      .pipe(batchTransform)
      .on('finish', () => {
        console.log('CSV processing completed');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error processing CSV:', error);
        reject(error);
      });
  });
}

// Legacy function for smaller imports
async function importWaitlistData() {
  try {
    console.log('Starting waitlist data import...');
    
    // Read the CSV file
    const csvFilePath = path.join(process.cwd(), 'attached_assets', 'peochain14.03.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    // Parse CSV data
    const rawRecords = await new Promise<any[]>((resolve, reject) => {
      parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });
    
    console.log(`Found ${rawRecords.length} records to import`);
    
    // Validate and sanitize records
    const validRecords: ValidatedRecord[] = [];
    const invalidRecords: InvalidRecord[] = [];
    
    for (const record of rawRecords) {
      try {
        const validatedRecord = csvRecordSchema.parse(record);
        validRecords.push(validatedRecord);
      } catch (error) {
        if (error instanceof ZodError) {
          const validationError = fromZodError(error);
          invalidRecords.push({
            record,
            error: validationError.message
          });
        } else {
          invalidRecords.push({
            record,
            error: 'Unknown validation error'
          });
        }
      }
    }
    
    console.log(`Valid records: ${validRecords.length}, Invalid records: ${invalidRecords.length}`);
    
    // Log invalid records for review
    if (invalidRecords.length > 0) {
      console.log('Invalid records:');
      console.log(JSON.stringify(invalidRecords, null, 2));
      
      // Optionally write to a file for review
      fs.writeFileSync(
        path.join(process.cwd(), 'attached_assets', 'invalid_records.json'),
        JSON.stringify(invalidRecords, null, 2)
      );
    }
    
    // First, clear existing waitlist data using parameterized query
    // (This is better for a demo but would be removed in production)
    try {
      // Use parameterized query with the table reference
      await db.execute(sql`TRUNCATE TABLE ${waitlistEntries} RESTART IDENTITY CASCADE`);
      console.log('Cleared existing waitlist entries');
    } catch (error) {
      console.error('Error clearing existing entries:', error);
    }

    // Process records in batches for better performance
    const batchSize = BATCH_SIZE;
    let successCount = 0;
    let errorCount = 0;
    
    // Process batches of records
    for (let i = 0; i < validRecords.length && i < MAX_RECORDS; i += batchSize) {
      // Apply rate limiting
      if (!checkRateLimit()) {
        console.log('Rate limit reached, pausing import...');
        // Wait until the rate limit window resets
        await new Promise(resolve => setTimeout(resolve, importRateLimit.resetTime - Date.now()));
        console.log('Resuming import...');
      }
      
      const batch = validRecords.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(Math.min(validRecords.length, MAX_RECORDS) / batchSize)}`);
      
      const batchResult = await processBatch(batch);
      successCount += batchResult.successCount;
      errorCount += batchResult.errorCount;
      
      console.log(`Processed ${i + batch.length} of ${validRecords.length} records`);
    }
    
    console.log('Import completed!');
    console.log(`Successfully imported: ${successCount} records`);
    console.log(`Errors: ${errorCount} records`);
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Add some geographic and referral channel data for analytics
async function addAnalyticsData() {
  try {
    console.log('Adding analytics data...');
    
    // Add some geographic stats
    const regions: InsertGeographicStats[] = [
      { region: 'North America', userCount: 3500, engagementScore: Math.round(0.45 * 100) },
      { region: 'Europe', userCount: 1800, engagementScore: Math.round(0.38 * 100) },
      { region: 'Asia', userCount: 1200, engagementScore: Math.round(0.32 * 100) },
      { region: 'South America', userCount: 650, engagementScore: Math.round(0.29 * 100) },
      { region: 'Africa', userCount: 450, engagementScore: Math.round(0.25 * 100) },
      { region: 'Australia', userCount: 280, engagementScore: Math.round(0.41 * 100) }
    ];
    
    // Use bulk insert for geographic stats
    const geoStatsCount = await storage.createOrUpdateGeographicStatsBulk(regions);
    console.log(`Added/updated ${geoStatsCount} geographic regions`);
    
    // Add some referral channel stats
    const channels: InsertReferralChannel[] = [
      { channelName: 'Social Media', referralCount: 2800, conversionRate: Math.round(0.42 * 100) },
      { channelName: 'Direct', referralCount: 1900, conversionRate: Math.round(0.35 * 100) },
      { channelName: 'Email Campaign', referralCount: 1200, conversionRate: Math.round(0.38 * 100) },
      { channelName: 'Blog', referralCount: 850, conversionRate: Math.round(0.29 * 100) },
      { channelName: 'Partner Sites', referralCount: 750, conversionRate: Math.round(0.31 * 100) },
      { channelName: 'Influencer', referralCount: 480, conversionRate: Math.round(0.45 * 100) }
    ];
    
    // Use bulk insert for referral channels
    const channelsCount = await storage.createOrUpdateReferralChannelBulk(channels);
    console.log(`Added/updated ${channelsCount} referral channels`);
    
    // Add daily stats for the last 30 days
    const today = new Date();
    const dailyStats: InsertDailyWaitlistStats[] = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate some realistic growth pattern
      const signupCount = Math.floor(100 + (i * 10) + (Math.random() * 50));
      const totalReferrals = Math.floor(signupCount * (0.3 + (Math.random() * 0.2)));
      const conversionRate = Math.round((0.25 + (Math.random() * 0.2)) * 100);
      
      dailyStats.push({
        date: date.toISOString().split('T')[0], // Convert Date to string format
        signupCount,
        totalReferrals,
        conversionRate
      });
    }
    
    // Use bulk insert for daily stats
    const dailyStatsCount = await storage.createOrUpdateDailyStatsBulk(dailyStats);
    console.log(`Added/updated ${dailyStatsCount} daily stats records`);
    
    console.log('Analytics data added successfully!');
  } catch (error) {
    console.error('Error adding analytics data:', error);
  }
}

async function main() {
  // Choose the appropriate import method based on file size or environment variable
  const csvFilePath = path.join(process.cwd(), 'attached_assets', 'peochain14.03.csv');
  const useStreaming = process.env.USE_STREAMING === 'true' || 
                      (fs.existsSync(csvFilePath) && fs.statSync(csvFilePath).size > 5 * 1024 * 1024); // > 5MB
  
  if (useStreaming) {
    await streamImportWaitlistData();
  } else {
    await importWaitlistData();
  }
  
  await addAnalyticsData();
  process.exit(0);
}

main();