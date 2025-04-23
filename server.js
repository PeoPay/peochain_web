import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manual environment loading
try {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  const envVars = envContent.split('\n').filter(Boolean);
  
  for (const line of envVars) {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
} catch (error) {
  console.log('No .env file found or error reading it, continuing without it');
}

// Check for simple mode flag
const isSimpleMode = process.env.RUNNING_MODE === 'simple';

if (isSimpleMode) {
  console.log('Starting in SIMPLE mode for debugging...');
  // Import the simple server
  import('./server-simple.js');
} else {
  console.log('Starting in FULL mode...');
  // Import the full server using tsx (we can't directly import TypeScript)
  import('child_process').then(({ spawn }) => {
    const child = spawn('tsx', ['server/index.ts'], { stdio: 'inherit' });
    
    child.on('error', (error) => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
    
    // Pass through signals
    process.on('SIGINT', () => child.kill('SIGINT'));
    process.on('SIGTERM', () => child.kill('SIGTERM'));
  });
}