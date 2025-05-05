/**
 * Jest setup file
 * 
 * This file runs before each test file and sets up the test environment.
 */

import { jest, afterAll } from '@jest/globals';

// Set up environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// Mock implementations for external services can be added here
jest.mock('../server/db', () => {
  // Mock database implementation
  return {
    db: {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue([]),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      onConflictDoNothing: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: 1 }]),
    },
    pool: {
      end: jest.fn().mockResolvedValue(true),
    }
  };
});

// Global teardown
afterAll(async () => {
  // Clean up any resources after all tests
  jest.resetAllMocks();
});
