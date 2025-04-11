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

import { Server as HTTPServer } from 'http';
import { Server, Socket } from 'socket.io';
import { createClient } from 'redis';
import { log } from './vite';

// Define event types for type safety
export type WaitlistEvent = 
  | { type: 'NEW_SIGNUP'; data: { email: string; position: number; referralCode: string } }
  | { type: 'NEW_REFERRAL'; data: { referralCode: string; count: number } }
  | { type: 'ANALYTICS_UPDATE'; data: { totalSignups: number; totalReferrals: number } };

export class WebSocketManager {
  private io: Server;
  private redisPublisher: ReturnType<typeof createClient>;
  private redisSubscriber: ReturnType<typeof createClient>;
  private redisChannel = 'peochain:events';
  private connectionCount = 0;

  constructor(server: HTTPServer) {
    // Initialize Socket.IO server
    this.io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : '*',
        methods: ['GET', 'POST'],
      },
      transports: ['websocket', 'polling'],
    });

    // Initialize Redis clients
    this.redisPublisher = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.redisSubscriber = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.initialize();
  }

  private async initialize() {
    try {
      // Connect to Redis
      await this.redisPublisher.connect();
      await this.redisSubscriber.connect();

      // Subscribe to Redis channel
      await this.redisSubscriber.subscribe(this.redisChannel, (message) => {
        try {
          const event = JSON.parse(message) as WaitlistEvent;
          this.broadcastEvent(event);
        } catch (error) {
          log(`Error parsing Redis message: ${error}`, 'websocket');
        }
      });

      // Handle Socket.IO connections
      this.io.on('connection', (socket: Socket) => this.handleConnection(socket));

      log('WebSocket server initialized with Redis pub/sub', 'websocket');
    } catch (error) {
      log(`Failed to initialize WebSocket server: ${error}`, 'websocket');
      
      // Fallback to local-only mode if Redis connection fails
      if (!this.io.listenerCount('connection')) {
        this.io.on('connection', (socket: Socket) => this.handleConnection(socket));
        log('WebSocket server initialized in local-only mode (no Redis)', 'websocket');
      }
    }
  }

  private handleConnection(socket: Socket) {
    this.connectionCount++;
    log(`Client connected. Total connections: ${this.connectionCount}`, 'websocket');

    // Join analytics room for broadcast events
    socket.join('analytics');
    
    // Send current stats to new client
    this.sendCurrentStats(socket);

    // Handle disconnection
    socket.on('disconnect', () => {
      this.connectionCount--;
      log(`Client disconnected. Total connections: ${this.connectionCount}`, 'websocket');
    });

    // Handle authentication (optional)
    socket.on('authenticate', (token: string) => {
      // Implement authentication logic here
      log(`Client authenticated: ${socket.id}`, 'websocket');
      socket.join('admin');
    });

    // Handle room joining
    socket.on('join', (room: string) => {
      socket.join(room);
      log(`Client ${socket.id} joined room: ${room}`, 'websocket');
    });
  }

  /**
   * Publish an event to all connected clients across all instances via Redis
   */
  public async publishEvent(event: WaitlistEvent) {
    try {
      if (this.redisPublisher.isOpen) {
        await this.redisPublisher.publish(this.redisChannel, JSON.stringify(event));
        log(`Published event to Redis: ${event.type}`, 'websocket');
      } else {
        // Fallback to direct broadcast if Redis is not available
        this.broadcastEvent(event);
      }
    } catch (error) {
      log(`Error publishing event: ${error}`, 'websocket');
      // Fallback to direct broadcast
      this.broadcastEvent(event);
    }
  }

  /**
   * Broadcast an event directly to all connected clients on this instance
   */
  private broadcastEvent(event: WaitlistEvent) {
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
      default:
        log(`Unknown event type: ${(event as any).type}`, 'websocket');
    }
  }

  /**
   * Send current application stats to a specific client
   */
  private async sendCurrentStats(socket: Socket) {
    // This would typically fetch current data from your database
    // For now, just sending a placeholder event
    socket.emit('analytics:update', {
      totalSignups: 0,
      totalReferrals: 0,
    });
  }

  /**
   * Gracefully shut down the WebSocket server and Redis connections
   */
  public async shutdown() {
    log('Shutting down WebSocket server...', 'websocket');
    
    // Close all Socket.IO connections
    this.io.disconnectSockets(true);
    
    // Close Redis connections
    if (this.redisPublisher.isOpen) {
      await this.redisPublisher.quit();
    }
    
    if (this.redisSubscriber.isOpen) {
      await this.redisSubscriber.quit();
    }
    
    log('WebSocket server shut down successfully', 'websocket');
  }
}

// Export a singleton instance factory
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