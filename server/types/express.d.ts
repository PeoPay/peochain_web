/**
 * Type declarations to extend Express Request interface
 * This adds support for CSRF tokens and request IDs
 */

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      csrfToken(): string;
      requestId?: string;
    }
  }
}
