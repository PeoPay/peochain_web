import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { db } from './server/db';
import { storage } from './server/storage';
import { InsertWaitlistEntry, waitlistEntries } from './shared/schema';
import { sql } from 'drizzle-orm';

async function importWaitlistData() {
  try {
    console.log('Starting waitlist data import...');
    
    // Read the CSV file
    const csvFilePath = path.join(process.cwd(), 'attached_assets', 'peochain14.03.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    // Parse CSV data
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    console.log(`Found ${records.length} records to import`);
    
    // Insert records in batches to avoid overloading the database
    const batchSize = 10; // Smaller batch size
    let successCount = 0;
    let errorCount = 0;
    
    // First, clear existing waitlist data 
    // (This is better for a demo but would be removed in production)
    try {
      await db.execute(sql`TRUNCATE TABLE ${waitlistEntries} RESTART IDENTITY CASCADE`);
      console.log('Cleared existing waitlist entries');
    } catch (error) {
      console.error('Error clearing existing entries:', error);
    }

    // Process records one by one instead of in parallel to avoid connection issues
    for (let i = 0; i < records.length && i < 2000; i++) { // Increased limit to 2000
      const record = records[i];
      try {
        // Create entry data
        const entryData: InsertWaitlistEntry = {
          email: record.email,
          fullName: record.full_name,
        };
        
        await storage.createWaitlistEntry(entryData);
        successCount++;
        
        if (i % 10 === 0) {
          console.log(`Processed ${i} of ${records.length} records`);
        }
      } catch (error) {
        console.error(`Error importing record: ${record.email}`);
        errorCount++;
      }
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
    const regions = [
      { region: 'North America', userCount: 3500, conversionRate: 0.45 },
      { region: 'Europe', userCount: 1800, conversionRate: 0.38 },
      { region: 'Asia', userCount: 1200, conversionRate: 0.32 },
      { region: 'South America', userCount: 650, conversionRate: 0.29 },
      { region: 'Africa', userCount: 450, conversionRate: 0.25 },
      { region: 'Australia', userCount: 280, conversionRate: 0.41 }
    ];
    
    for (const data of regions) {
      await storage.createOrUpdateGeographicStats(data);
    }
    
    // Add some referral channel stats
    const channels = [
      { channelName: 'Social Media', referralCount: 2800, conversionRate: 0.42 },
      { channelName: 'Direct', referralCount: 1900, conversionRate: 0.35 },
      { channelName: 'Email Campaign', referralCount: 1200, conversionRate: 0.38 },
      { channelName: 'Blog', referralCount: 850, conversionRate: 0.29 },
      { channelName: 'Partner Sites', referralCount: 750, conversionRate: 0.31 },
      { channelName: 'Influencer', referralCount: 480, conversionRate: 0.45 }
    ];
    
    for (const data of channels) {
      await storage.createOrUpdateReferralChannel(data);
    }
    
    // Add daily stats for the last 30 days
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Generate some realistic growth pattern
      const signupCount = Math.floor(100 + (i * 10) + (Math.random() * 50));
      const totalReferrals = Math.floor(signupCount * (0.3 + (Math.random() * 0.2)));
      const conversionRate = 0.25 + (Math.random() * 0.2);
      
      await storage.createOrUpdateDailyStats({
        date,
        signupCount,
        totalReferrals,
        conversionRate
      });
    }
    
    console.log('Analytics data added successfully!');
  } catch (error) {
    console.error('Error adding analytics data:', error);
  }
}

async function main() {
  await importWaitlistData();
  await addAnalyticsData();
  process.exit(0);
}

main();