import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';
import { createRateLimiterMiddleware } from '../../../server/middleware/rateLimiter';

describe('Rate Limiter Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    // Reset mocks before each test
    mockRequest = {
      ip: '127.0.0.1',
      path: '/api/test',
      method: 'POST',
      headers: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      setHeader: jest.fn()
    };
    
    nextFunction = jest.fn();
  });

  test('should allow requests within rate limit', () => {
    // Arrange
    const rateLimiter = createRateLimiterMiddleware({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // 100 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Act
    rateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);

    // Assert
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  test('should block requests that exceed rate limit', () => {
    // Arrange
    const rateLimiter = createRateLimiterMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 1, // Only allow 1 request per windowMs
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Act - First request should pass
    rateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
    
    // Reset the next function mock to check if it's called again
    nextFunction.mockReset();
    
    // Act - Second request should be blocked
    rateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);

    // Assert - The second request should not call next()
    expect(nextFunction).not.toHaveBeenCalled();
  });

  test('should apply different limits based on the request path', () => {
    // Arrange
    const sensitiveRateLimiter = createRateLimiterMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 5, // Stricter limit for sensitive endpoints
      standardHeaders: true,
      legacyHeaders: false,
    });

    const regularRateLimiter = createRateLimiterMiddleware({
      windowMs: 15 * 60 * 1000,
      max: 100, // Higher limit for regular endpoints
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Act - Test sensitive endpoint with stricter limit
    mockRequest.path = '/api/sensitive';
    
    // Make multiple requests to exceed the sensitive limit
    for (let i = 0; i < 5; i++) {
      sensitiveRateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
    }
    
    // Reset the next function mock
    nextFunction.mockReset();
    
    // One more request should be blocked
    sensitiveRateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);

    // Assert - The 6th request should be blocked
    expect(nextFunction).not.toHaveBeenCalled();

    // Act - Test regular endpoint with higher limit
    mockRequest.path = '/api/regular';
    nextFunction.mockReset();
    
    // Make multiple requests but stay under the regular limit
    for (let i = 0; i < 10; i++) {
      regularRateLimiter(mockRequest as Request, mockResponse as Response, nextFunction);
    }

    // Assert - Requests should still be allowed
    expect(nextFunction).toHaveBeenCalled();
  });
});
