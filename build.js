#!/usr/bin/env node

// This is a custom build script for production deployment
// It runs the Vite build for the frontend and then builds the server with esbuild in CJS format

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting custom build process...');

// Step 1: Build the frontend with Vite
console.log('Building frontend with Vite...');
execSync('npx vite build', { stdio: 'inherit' });

// Step 2: Build the server with esbuild in CJS format
console.log('Building server with esbuild in CJS format...');
execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=cjs --outdir=dist', { stdio: 'inherit' });

// Step 3: Make sure the dist directory exists
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Step 4: Create a startup script for production
const startupScript = `#!/bin/sh
NODE_ENV=production PORT=5000 node dist/index.js
`;

const startupScriptPath = path.join(process.cwd(), 'start-prod.sh');
fs.writeFileSync(startupScriptPath, startupScript);
fs.chmodSync(startupScriptPath, '755'); // Make it executable

console.log('Build completed successfully!');
console.log('To start the production server, run: ./start-prod.sh');