#!/usr/bin/env node

/**
 * Production Server Starter
 * 
 * This script provides a convenient way to start the server in production mode.
 * It ensures proper environment variables are set and handles common production issues.
 */

// Set environment to production if not already set
process.env.NODE_ENV = 'production';

// Set default port if not provided
if (!process.env.PORT) {
  process.env.PORT = '5000';
}

// Log startup information
console.log(`Starting PeoChain server in production mode on port ${process.env.PORT}`);
console.log(`Server process ID: ${process.pid}`);
console.log(`Started at: ${new Date().toISOString()}`);

// Load and start the server
try {
  // Import the server (assumes CJS format build)
  require('./dist/index.js');
  
  console.log('Server loaded successfully');
} catch (error) {
  console.error('Failed to start the server:');
  console.error(error);
  process.exit(1);
}

// Handle termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    console.log(`Server stopped at: ${new Date().toISOString()}`);
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:');
  console.error(error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:');
  console.error(reason);
  process.exit(1);
});