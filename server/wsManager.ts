/**
 * WebSocket Manager
 * 
 * This module provides a centralized WebSocket management system for real-time
 * communication between the server and clients.
 */

import { WebSocketServer, WebSocket } from 'ws';
import { logger } from './utils/logger';
import { randomUUID } from 'crypto';

// Client connection interface
interface WSClient {
  id: string;
  socket: WebSocket;
  isAlive: boolean;
  userId?: string;
  lastActivity: number;
}

// Message types
export enum MessageType {
  PING = 'ping',
  PONG = 'pong',
  WAITLIST_UPDATE = 'waitlist_update',
  STATS_UPDATE = 'stats_update',
  NOTIFICATION = 'notification',
  ERROR = 'error'
}

// Message interface
interface WSMessage {
  type: MessageType;
  payload?: any;
  timestamp: number;
}

/**
 * WebSocket Manager class to handle real-time communication
 */
export class WSManager {
  private wss: WebSocketServer;
  private clients: Map<string, WSClient> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  
  constructor(wss: WebSocketServer) {
    this.wss = wss;
    this.setupWebSocketServer();
    this.startHeartbeat();
    
    logger.info('WebSocket server initialized');
  }
  
  /**
   * Set up WebSocket server event handlers
   */
  private setupWebSocketServer(): void {
    this.wss.on('connection', (socket: WebSocket) => {
      this.handleNewConnection(socket);
    });
    
    this.wss.on('error', (error: Error) => {
      logger.error('WebSocket server error', {
        error: error.message,
        stack: error.stack
      });
    });
    
    this.wss.on('close', () => {
      this.stopHeartbeat();
      logger.info('WebSocket server closed');
    });
  }
  
  /**
   * Handle new WebSocket connection
   */
  private handleNewConnection(socket: WebSocket): void {
    const clientId = randomUUID();
    
    // Add client to the map
    this.clients.set(clientId, {
      id: clientId,
      socket,
      isAlive: true,
      lastActivity: Date.now()
    });
    
    logger.info('New WebSocket connection', { clientId });
    
    // Set up client event handlers
    socket.on('message', (data: WebSocket.Data) => {
      this.handleClientMessage(clientId, data);
    });
    
    socket.on('close', () => {
      this.handleClientDisconnection(clientId);
    });
    
    socket.on('error', (error: Error) => {
      logger.error('WebSocket client error', {
        clientId,
        error: error.message
      });
    });
    
    // Send welcome message
    this.sendToClient(clientId, {
      type: MessageType.NOTIFICATION,
      payload: { message: 'Connected to PeoChain Waitlist' },
      timestamp: Date.now()
    });
  }
  
  /**
   * Handle client message
   */
  private handleClientMessage(clientId: string, data: WebSocket.Data): void {
    const client = this.clients.get(clientId);
    
    if (!client) return;
    
    // Update client activity timestamp
    client.lastActivity = Date.now();
    
    try {
      // Parse message
      const message = JSON.parse(data.toString()) as WSMessage;
      
      // Handle different message types
      switch (message.type) {
        case MessageType.PING:
          this.sendToClient(clientId, {
            type: MessageType.PONG,
            timestamp: Date.now()
          });
          break;
          
        // Handle other message types as needed
        
        default:
          logger.debug('Received unknown message type', {
            clientId,
            messageType: message.type
          });
      }
    } catch (error) {
      logger.warn('Failed to parse WebSocket message', {
        clientId,
        error: error instanceof Error ? error.message : String(error),
        data: data.toString().substring(0, 100) // Log only the first 100 chars
      });
      
      // Send error message to client
      this.sendToClient(clientId, {
        type: MessageType.ERROR,
        payload: { message: 'Invalid message format' },
        timestamp: Date.now()
      });
    }
  }
  
  /**
   * Handle client disconnection
   */
  private handleClientDisconnection(clientId: string): void {
    const client = this.clients.get(clientId);
    
    if (client) {
      logger.info('WebSocket client disconnected', {
        clientId,
        userId: client.userId,
        connectionDuration: Date.now() - client.lastActivity
      });
      
      this.clients.delete(clientId);
    }
  }
  
  /**
   * Send message to a specific client
   */
  private sendToClient(clientId: string, message: WSMessage): boolean {
    const client = this.clients.get(clientId);
    
    if (!client) return false;
    
    try {
      client.socket.send(JSON.stringify(message));
      return true;
    } catch (error) {
      logger.error('Failed to send message to client', {
        clientId,
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }
  
  /**
   * Broadcast message to all connected clients
   */
  public broadcast(message: Omit<WSMessage, 'timestamp'>): void {
    const fullMessage: WSMessage = {
      ...message,
      timestamp: Date.now()
    };
    
    this.clients.forEach((client) => {
      if (client.isAlive) {
        try {
          client.socket.send(JSON.stringify(fullMessage));
        } catch (error) {
          logger.error('Failed to broadcast message to client', {
            clientId: client.id,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    });
    
    logger.debug('Broadcast message sent', {
      messageType: message.type,
      clientCount: this.clients.size
    });
  }
  
  /**
   * Broadcast waitlist update to all connected clients
   */
  public broadcastWaitlistUpdate(data: any): void {
    this.broadcast({
      type: MessageType.WAITLIST_UPDATE,
      payload: data
    });
  }
  
  /**
   * Broadcast stats update to all connected clients
   */
  public broadcastStatsUpdate(data: any): void {
    this.broadcast({
      type: MessageType.STATS_UPDATE,
      payload: data
    });
  }
  
  /**
   * Start heartbeat interval to check for dead connections
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.clients.forEach((client, clientId) => {
        if (!client.isAlive) {
          client.socket.terminate();
          this.clients.delete(clientId);
          return;
        }
        
        client.isAlive = false;
        
        try {
          client.socket.ping();
        } catch (error) {
          client.socket.terminate();
          this.clients.delete(clientId);
        }
      });
    }, 30000); // Check every 30 seconds
  }
  
  /**
   * Stop heartbeat interval
   */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  
  /**
   * Get the number of connected clients
   */
  public getClientCount(): number {
    return this.clients.size;
  }
  
  /**
   * Close all connections and shut down the WebSocket server
   */
  public shutdown(): void {
    this.stopHeartbeat();
    
    // Close all client connections
    this.clients.forEach((client) => {
      try {
        client.socket.terminate();
      } catch (error) {
        // Ignore errors during shutdown
      }
    });
    
    this.clients.clear();
    
    // Close the WebSocket server
    this.wss.close();
    
    logger.info('WebSocket manager shut down');
  }
}
