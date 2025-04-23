/**
 * WebSocket Infrastructure with Redis Pub/Sub
 * 
 * This module implements a robust WebSocket management system using Redis for pub/sub operations,
 * allowing the application to scale horizontally across multiple instances while maintaining
 * real-time communication capabilities.
 * 
 * Features:
 * - Redis pub/sub for cross-instance message distribution
 * - Socket.IO for reliable WebSocket connections
 * - Automatic reconnection and error handling
 * - Event namespacing and room-based messaging
 * - Message serialization and deserialization
 */

import { Server as SocketServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket } from 'socket.io';
import { createClient } from 'redis';
import { log } from './vite';
import { getAnalyticsService } from './analytics';

// Define the event types for better type safety
export type WaitlistEvent = 
  | { type: 'NEW_SIGNUP'; data: { email: string; position: number; referralCode: string } }
  | { type: 'NEW_REFERRAL'; data: { referralCode: string; count: number } }
  | { type: 'ANALYTICS_UPDATE'; data: { totalSignups: number; totalReferrals: number } };

export class WebSocketManager {
  private io: SocketServer;
  private redisPublisher: ReturnType<typeof createClient> | null = null;
  private redisSubscriber: ReturnType<typeof createClient> | null = null;
  private redisChannel = 'peochain:events';
  private connectionCount = 0;
  private redisEnabled = false;

  constructor(server: HTTPServer) {
    // Initialize Socket.IO with CORS settings
    this.io = new SocketServer(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    // Initialize Redis if Redis URL is provided
    this.initialize();
  }

  private async initialize() {
    try {
      const redisUrl = process.env.REDIS_URL;
      if (redisUrl) {
        this.redisPublisher = createClient({ url: redisUrl });
        this.redisSubscriber = createClient({ url: redisUrl });

        // Set up event listeners for Redis client
        this.redisPublisher.on('error', (err) => log(`Redis publisher error: ${err}`, 'websocket'));
        this.redisSubscriber.on('error', (err) => log(`Redis subscriber error: ${err}`, 'websocket'));

        // Connect to Redis
        await this.redisPublisher.connect();
        await this.redisSubscriber.connect();

        // Subscribe to our Redis channel
        await this.redisSubscriber.subscribe(this.redisChannel, (message) => {
          try {
            const event: WaitlistEvent = JSON.parse(message);
            this.broadcastEvent(event);
          } catch (error) {
            log(`Error parsing Redis message: ${error}`, 'websocket');
          }
        });

        this.redisEnabled = true;
        log('WebSocket server initialized with Redis pub/sub', 'websocket');
      } else {
        log('Redis URL not provided, running in local-only mode', 'websocket');
      }

      // Set up Socket.IO connection handling
      this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
    } catch (error) {
      log(`Failed to initialize WebSocket server: ${error}`, 'websocket');
      // Even if Redis fails, we can still run in local-only mode
      this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
      log('WebSocket server initialized in local-only mode (no Redis)', 'websocket');
    }
  }

  private handleConnection(socket: Socket) {
    this.connectionCount++;
    log(`New WebSocket connection: ${socket.id} (Total: ${this.connectionCount})`, 'websocket');

    // Send current stats to the newly connected client
    this.sendCurrentStats(socket);

    // Handle room joining
    socket.on('join', (room) => {
      socket.join(room);
      log(`Client ${socket.id} joined room: ${room}`, 'websocket');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      this.connectionCount--;
      log(`WebSocket disconnected: ${socket.id} (Total: ${this.connectionCount})`, 'websocket');
    });
  }

  /**
   * Publish an event to all connected clients across all instances via Redis
   */
  public async publishEvent(event: WaitlistEvent) {
    try {
      // First, broadcast to all clients on this instance
      this.broadcastEvent(event);

      // Then, if Redis is enabled, publish to Redis for other instances
      if (this.redisEnabled && this.redisPublisher) {
        await this.redisPublisher.publish(this.redisChannel, JSON.stringify(event));
        log(`Published event to Redis: ${event.type}`, 'websocket');
      }
    } catch (error) {
      log(`Error publishing event: ${error}`, 'websocket');
    }
  }

  /**
   * Broadcast an event directly to all connected clients on this instance
   */
  private broadcastEvent(event: WaitlistEvent) {
    try {
      switch (event.type) {
        case 'NEW_SIGNUP':
          this.io.to('analytics').emit('waitlist:signup', event.data);
          break;
        case 'NEW_REFERRAL':
          this.io.to('analytics').emit('waitlist:referral', event.data);
          break;
        case 'ANALYTICS_UPDATE':
          this.io.to('analytics').emit('analytics:update', event.data);
          break;
      }
      log(`Broadcast ${event.type} event to ${this.io.sockets.adapter.rooms.get('analytics')?.size || 0} clients`, 'websocket');
    } catch (error) {
      log(`Error broadcasting event: ${error}`, 'websocket');
    }
  }

  /**
   * Send current application stats to a specific client
   */
  private async sendCurrentStats(socket: Socket) {
    try {
      const analyticsService = getAnalyticsService();
      const totalSignups = await analyticsService.getTotalSignupCount();
      const totalReferrals = await analyticsService.getTotalReferralCount();

      socket.emit('analytics:update', {
        totalSignups,
        totalReferrals
      });
    } catch (error) {
      log(`Error sending current stats: ${error}`, 'websocket');
    }
  }

  /**
   * Gracefully shut down the WebSocket server and Redis connections
   */
  public async shutdown() {
    try {
      // Close all Socket.IO connections
      this.io.disconnectSockets();

      // Close Redis connections if they exist
      if (this.redisPublisher) {
        await this.redisPublisher.quit();
      }
      if (this.redisSubscriber) {
        await this.redisSubscriber.quit();
      }

      log('WebSocket server shut down', 'websocket');
    } catch (error) {
      log(`Error during WebSocket shutdown: ${error}`, 'websocket');
    }
  }
}

// Singleton manager instance
let wsManager: WebSocketManager | null = null;

export function initializeWebSockets(server: HTTPServer): WebSocketManager {
  if (!wsManager) {
    wsManager = new WebSocketManager(server);
  }
  return wsManager;
}

export function getWebSocketManager(): WebSocketManager | null {
  return wsManager;
}