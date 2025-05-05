import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { storage } from '../../../server/storage';
import { db } from '../../../server/db';
import { 
  InsertWaitlistEntry, 
  InsertGeographicStats, 
  InsertReferralChannel, 
  InsertDailyWaitlistStats 
} from '../../../shared/schema';

// Mock the database module
jest.mock('../../../server/db', () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValue([]),
    onConflictDoUpdate: jest.fn().mockReturnThis(),
    onConflictDoNothing: jest.fn().mockReturnThis(),
    returning: jest.fn().mockImplementation(() => {
      return [{ id: 1 }, { id: 2 }]; // Mock returning two records
    }),
  }
}));

describe('Bulk Operations', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('createWaitlistEntryBulk', () => {
    test('should successfully insert multiple waitlist entries', async () => {
      // Arrange
      const mockEntries: InsertWaitlistEntry[] = [
        {
          email: 'test1@example.com',
          fullName: 'Test User 1',
          userType: 'user',
        },
        {
          email: 'test2@example.com',
          fullName: 'Test User 2',
          userType: 'developer',
        }
      ];

      // Mock the returning method to return the expected result
      (db.insert as jest.Mock).mockReturnThis();
      (db.values as jest.Mock).mockReturnThis();
      (db.onConflictDoNothing as jest.Mock).mockReturnThis();
      (db.returning as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);

      // Act
      const result = await storage.createWaitlistEntryBulk(mockEntries);

      // Assert
      expect(result).toBe(2);
      expect(db.insert).toHaveBeenCalledTimes(1);
      expect(db.values).toHaveBeenCalledTimes(1);
      expect(db.onConflictDoNothing).toHaveBeenCalledTimes(1);
      expect(db.returning).toHaveBeenCalledTimes(1);
    });

    test('should return 0 when no entries are provided', async () => {
      // Act
      const result = await storage.createWaitlistEntryBulk([]);

      // Assert
      expect(result).toBe(0);
      expect(db.insert).not.toHaveBeenCalled();
    });

    test('should handle database errors gracefully', async () => {
      // Arrange
      const mockEntries: InsertWaitlistEntry[] = [
        {
          email: 'test@example.com',
          fullName: 'Test User',
          userType: 'user',
        }
      ];

      // Mock a database error
      (db.insert as jest.Mock).mockReturnThis();
      (db.values as jest.Mock).mockReturnThis();
      (db.onConflictDoNothing as jest.Mock).mockReturnThis();
      (db.returning as jest.Mock).mockRejectedValue(new Error('Database error'));

      // Act
      const result = await storage.createWaitlistEntryBulk(mockEntries);

      // Assert
      expect(result).toBe(0);
      expect(db.insert).toHaveBeenCalledTimes(1);
    });
  });

  describe('createOrUpdateGeographicStatsBulk', () => {
    test('should successfully insert or update geographic stats', async () => {
      // Arrange
      const mockStats: InsertGeographicStats[] = [
        { region: 'North America', userCount: 1000, engagementScore: 75 },
        { region: 'Europe', userCount: 500, engagementScore: 80 }
      ];

      // Mock the returning method to return the expected result
      (db.insert as jest.Mock).mockReturnThis();
      (db.values as jest.Mock).mockReturnThis();
      (db.onConflictDoUpdate as jest.Mock).mockReturnThis();
      (db.returning as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);

      // Act
      const result = await storage.createOrUpdateGeographicStatsBulk(mockStats);

      // Assert
      expect(result).toBe(2);
      expect(db.insert).toHaveBeenCalledTimes(1);
      expect(db.values).toHaveBeenCalledTimes(1);
      expect(db.onConflictDoUpdate).toHaveBeenCalledTimes(1);
      expect(db.returning).toHaveBeenCalledTimes(1);
    });
  });

  describe('createOrUpdateReferralChannelBulk', () => {
    test('should successfully insert or update referral channels', async () => {
      // Arrange
      const mockChannels: InsertReferralChannel[] = [
        { channelName: 'Social Media', referralCount: 500, conversionRate: 30 },
        { channelName: 'Email', referralCount: 300, conversionRate: 25 }
      ];

      // Mock the returning method to return the expected result
      (db.insert as jest.Mock).mockReturnThis();
      (db.values as jest.Mock).mockReturnThis();
      (db.onConflictDoUpdate as jest.Mock).mockReturnThis();
      (db.returning as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);

      // Act
      const result = await storage.createOrUpdateReferralChannelBulk(mockChannels);

      // Assert
      expect(result).toBe(2);
      expect(db.insert).toHaveBeenCalledTimes(1);
      expect(db.values).toHaveBeenCalledTimes(1);
      expect(db.onConflictDoUpdate).toHaveBeenCalledTimes(1);
      expect(db.returning).toHaveBeenCalledTimes(1);
    });
  });

  describe('createOrUpdateDailyStatsBulk', () => {
    test('should successfully insert or update daily stats', async () => {
      // Arrange
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const mockStats: InsertDailyWaitlistStats[] = [
        { 
          date: today.toISOString().split('T')[0], 
          signupCount: 100, 
          totalReferrals: 30, 
          conversionRate: 30 
        },
        { 
          date: yesterday.toISOString().split('T')[0], 
          signupCount: 90, 
          totalReferrals: 25, 
          conversionRate: 28 
        }
      ];

      // Mock the returning method to return the expected result
      (db.insert as jest.Mock).mockReturnThis();
      (db.values as jest.Mock).mockReturnThis();
      (db.onConflictDoUpdate as jest.Mock).mockReturnThis();
      (db.returning as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);

      // Act
      const result = await storage.createOrUpdateDailyStatsBulk(mockStats);

      // Assert
      expect(result).toBe(2);
      expect(db.insert).toHaveBeenCalledTimes(1);
      expect(db.values).toHaveBeenCalledTimes(1);
      expect(db.onConflictDoUpdate).toHaveBeenCalledTimes(1);
      expect(db.returning).toHaveBeenCalledTimes(1);
    });
  });
});
