#!/usr/bin/env node

console.log("\x1b[36m%s\x1b[0m", "🚀 Starting PeoChain in Simple Mode");
console.log("\x1b[33m%s\x1b[0m", "This is a workaround for the workflow detection issue.");
console.log("\x1b[33m%s\x1b[0m", "To use the full application, you'll need to run it manually after this starts.");

const { spawn } = require('child_process');

// Launch the simple server
const child = spawn('node', ['server-simple.js'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});

// Handle clean shutdowns
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  child.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  child.kill('SIGTERM');
  process.exit(0);
});