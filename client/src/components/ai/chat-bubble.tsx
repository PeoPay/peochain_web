import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date | string;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  content, 
  role, 
  timestamp,
  className
}) => {
  const isUser = role === 'user';
  const formattedTime = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  
  return (
    <div className={cn(
      "flex w-full my-2", 
      isUser ? "justify-end" : "justify-start",
      className
    )}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 break-words",
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-muted text-foreground rounded-tl-none"
      )}>
        <div className="whitespace-pre-wrap">
          {content}
        </div>
        {timestamp && (
          <div className={cn(
            "text-xs mt-1 text-right",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground"
          )}>
            {formattedTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;