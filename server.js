const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { spawn } = require('child_process');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PeoChain API is running' });
});

// API routes
app.get('/api/info', async (req, res) => {
  try {
    res.json({
      name: 'PeoChain DeFi Platform',
      version: '1.0.0',
      description: 'A cutting-edge DeFi platform for blockchain education',
      consensus: 'Proof of Synergy (PoSyg)',
      features: [
        'Dynamic Contribution Scoring',
        'Scalable Architecture',
        'Educational Resources',
        'Interactive Whitepaper'
      ]
    });
  } catch (error) {
    console.error('Error fetching info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PeoChain central server running on port ${PORT}`);
  
  // Start client development server
  const clientProcess = spawn('npx', ['vite'], { 
    cwd: path.join(__dirname, 'apps/client'),
    stdio: 'inherit',
    shell: true
  });
  
  clientProcess.on('error', (error) => {
    console.error('Failed to start client:', error);
  });
  
  console.log('Client development server started');
});