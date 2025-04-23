import { spawn } from 'child_process';

// Start the simple server that quickly opens port 5000
console.log('🚀 Starting PeoChain server...');

// Launch the simple server that will quickly open port 5000
// This is a workaround for the workflow detection issue
const child = spawn('node', ['server-simple.js'], { stdio: 'inherit' });

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