import { storage } from './server/storage';
import { db } from './server/db';
import { InsertWaitlistEntry, InsertGeographicStats, InsertReferralChannel, InsertDailyWaitlistStats } from './shared/schema';

async function testBulkOperations() {
  console.log('Testing bulk operations...');
  
  // Test waitlist entry bulk insert
  const testEntries: InsertWaitlistEntry[] = [
    {
      email: 'test1@example.com',
      fullName: 'Test User 1',
      userType: 'user',
    },
    {
      email: 'test2@example.com',
      fullName: 'Test User 2',
      userType: 'user',
    },
    {
      email: 'test3@example.com',
      fullName: 'Test User 3',
      userType: 'developer',
    }
  ];
  
  console.log(`Inserting ${testEntries.length} test waitlist entries...`);
  const entriesCount = await storage.createWaitlistEntryBulk(testEntries);
  console.log(`Successfully inserted ${entriesCount} waitlist entries`);
  
  // Test geographic stats bulk insert
  const testGeoStats: InsertGeographicStats[] = [
    { region: 'Test Region 1', userCount: 100, engagementScore: 75 },
    { region: 'Test Region 2', userCount: 200, engagementScore: 85 }
  ];
  
  console.log(`Inserting ${testGeoStats.length} test geographic stats...`);
  const geoStatsCount = await storage.createOrUpdateGeographicStatsBulk(testGeoStats);
  console.log(`Successfully inserted/updated ${geoStatsCount} geographic stats`);
  
  // Test referral channel bulk insert
  const testChannels: InsertReferralChannel[] = [
    { channelName: 'Test Channel 1', referralCount: 50, conversionRate: 30 },
    { channelName: 'Test Channel 2', referralCount: 75, conversionRate: 40 }
  ];
  
  console.log(`Inserting ${testChannels.length} test referral channels...`);
  const channelsCount = await storage.createOrUpdateReferralChannelBulk(testChannels);
  console.log(`Successfully inserted/updated ${channelsCount} referral channels`);
  
  // Test daily stats bulk insert
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const testDailyStats: InsertDailyWaitlistStats[] = [
    { 
      date: today.toISOString().split('T')[0], 
      signupCount: 25, 
      totalReferrals: 10, 
      conversionRate: 40 
    },
    { 
      date: yesterday.toISOString().split('T')[0], 
      signupCount: 20, 
      totalReferrals: 8, 
      conversionRate: 35 
    }
  ];
  
  console.log(`Inserting ${testDailyStats.length} test daily stats...`);
  const dailyStatsCount = await storage.createOrUpdateDailyStatsBulk(testDailyStats);
  console.log(`Successfully inserted/updated ${dailyStatsCount} daily stats`);
  
  console.log('Bulk operations testing completed!');
}

// Run the test
testBulkOperations()
  .then(() => {
    console.log('Test completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
