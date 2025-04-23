import express from 'express';
import cors from 'cors';
import { config } from './config';
import { apiRoutes } from './routes';

// Initialize Express app
const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'PeoChain API is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PeoChain server running on port ${PORT}`);
});