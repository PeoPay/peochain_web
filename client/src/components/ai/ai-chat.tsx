import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatBubble from './chat-bubble';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date | string;
}

export interface AIChatProps {
  title?: string;
  description?: string;
  className?: string;
  initialMessages?: Message[];
  sessionId?: string;
}

const AIChat: React.FC<AIChatProps> = ({ 
  title = "PeoChain AI Assistant", 
  description = "Ask me anything about blockchain, cryptocurrency, or PeoChain!",
  className,
  initialMessages = [],
  sessionId: existingSessionId
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(existingSessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize chat session if needed
  useEffect(() => {
    if (!sessionId && messages.length === 0) {
      initializeChat();
    } else if (sessionId && messages.length === 0) {
      fetchChatHistory();
    }
  }, [sessionId]);

  // Initialize a new chat session
  const initializeChat = async () => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSessionId(data.data.sessionId);
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: 'Hello! I\'m PeoChain\'s AI assistant. How can I help you learn about blockchain technology today?',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  // Fetch chat history if sessionId is provided
  const fetchChatHistory = async () => {
    if (!sessionId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(`/api/ai/chat/${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message to the AI
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/ai/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: userMessage.content
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [
          ...prev, 
          {
            role: 'assistant',
            content: data.data.message,
            timestamp: data.data.timestamp
          }
        ]);
        
        // Focus input for the next message
        inputRef.current?.focus();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] p-4 border-y">
          {messages.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <Bot className="w-12 h-12 mb-4 opacity-50" />
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))
          )}
          {isLoading && (
            <div className="flex justify-center my-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading || !sessionId}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading || !sessionId}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChat;