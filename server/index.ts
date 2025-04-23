import express from 'express';
import cors from 'cors';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Redis from 'ioredis';

// Initialize Express app
const app = express();
// Trust proxy to properly handle X-Forwarded-For in rate limiting
app.set('trust proxy', 1);
const httpServer = createServer(app);
const port = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Setup Redis for Socket.io (if Redis URL is provided)
const redisUrl = process.env.REDIS_URL;
let redis: Redis | null = null;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl);
    console.log('[websocket] Connected to Redis');
  } catch (err) {
    console.error('[websocket] Failed to connect to Redis:', err);
  }
} else {
  console.log('[websocket] Redis URL not provided, running in local-only mode');
}

// Setup rate limiting
let limiter;
try {
  if (redisUrl && redis) {
    console.log('[rate-limit] Using Redis store for rate limiting');
    limiter = RateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        // Using a simpler connection approach to avoid type errors
        sendCommand: async (...args: any[]) => redis!.call(...args),
      }),
    });
  } else {
    console.log('[rate-limit] Using Memory store for rate limiting');
    limiter = RateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
} catch (err) {
  console.error('[rate-limit] Error setting up rate limiting:', err);
  limiter = RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

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

// Socket.io events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
httpServer.listen(Number(port), '0.0.0.0', () => {
  console.log(`Server listening on port ${port} in ${isDev ? 'development' : 'production'} mode`);
});