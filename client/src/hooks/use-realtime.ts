/**
 * Real-time Communication Hook
 * 
 * This hook provides real-time communication capabilities using Socket.IO,
 * allowing components to subscribe to and receive updates from the WebSocket server.
 * 
 * Features:
 * - Automatic connection management
 * - Event subscription with type safety
 * - Reconnection handling
 * - Event filtering
 */
import { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useToast } from './use-toast';

// Define the event types for better type safety
export type WaitlistEvent = 
  | { type: 'NEW_SIGNUP'; email: string; position: number; referralCode: string }
  | { type: 'NEW_REFERRAL'; referralCode: string; count: number }
  | { type: 'ANALYTICS_UPDATE'; totalSignups: number; totalReferrals: number };

export interface UseRealtimeOptions {
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  notifyOnReconnect?: boolean;
}

export const useRealtime = (options: UseRealtimeOptions = {}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const { toast } = useToast();

  const {
    autoConnect = true,
    reconnectionAttempts = 5,
    notifyOnReconnect = true
  } = options;

  // Initialize socket connection
  useEffect(() => {
    if (!autoConnect) return;

    const socketInstance = io({
      transports: ['websocket', 'polling'],
      reconnectionAttempts,
      autoConnect: true
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log(`Socket reconnected after ${attemptNumber} attempts`);
      if (notifyOnReconnect) {
        toast({
          title: 'Reconnected',
          description: 'Real-time connection has been restored.',
          variant: 'default'
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [autoConnect, reconnectionAttempts, notifyOnReconnect, toast]);

  // Join a specific room
  const joinRoom = useCallback((room: string) => {
    if (socket && isConnected) {
      socket.emit('join', room);
    }
  }, [socket, isConnected]);

  // Subscribe to waitlist events
  const subscribeToWaitlist = useCallback((callback: (event: WaitlistEvent) => void) => {
    if (!socket) return () => {};

    const onSignup = (data: any) => {
      const event = { 
        type: 'NEW_SIGNUP', 
        ...data 
      } as WaitlistEvent;
      setLastMessage(event);
      callback(event);
    };

    const onReferral = (data: any) => {
      const event = { 
        type: 'NEW_REFERRAL', 
        ...data 
      } as WaitlistEvent;
      setLastMessage(event);
      callback(event);
    };

    const onAnalyticsUpdate = (data: any) => {
      const event = { 
        type: 'ANALYTICS_UPDATE', 
        ...data 
      } as WaitlistEvent;
      setLastMessage(event);
      callback(event);
    };

    socket.on('waitlist:signup', onSignup);
    socket.on('waitlist:referral', onReferral);
    socket.on('analytics:update', onAnalyticsUpdate);

    // Join the analytics room to receive broadcasts
    joinRoom('analytics');

    // Cleanup function
    return () => {
      socket.off('waitlist:signup', onSignup);
      socket.off('waitlist:referral', onReferral);
      socket.off('analytics:update', onAnalyticsUpdate);
    };
  }, [socket, joinRoom]);

  // Manual connect function
  const connect = useCallback(() => {
    if (socket) {
      socket.connect();
    }
  }, [socket]);

  // Manual disconnect function
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    lastMessage,
    subscribeToWaitlist,
    joinRoom,
    connect,
    disconnect
  };
};