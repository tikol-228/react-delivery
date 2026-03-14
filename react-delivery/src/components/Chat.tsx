import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Search, MoreVertical, Phone, Video, Smile, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: 'other', time: "10:00 AM" },
    { id: 2, text: "I'd like to check my order status #34562", sender: 'me', time: "10:01 AM" },
    { id: 3, text: "Sure! Let me check that for you. One moment please...", sender: 'other', time: "10:02 AM" },
    { id: 4, text: "Your order is currently being prepared and will be delivered in 20 minutes.", sender: 'other', time: "10:05 AM" },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-background overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Customer Support</h3>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Phone size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Video size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical size={20} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-card text-foreground border border-border rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-[10px] mt-1 block opacity-70 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-background rounded-xl border border-border p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Paperclip size={20} />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-10"
          />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Smile size={20} />
          </Button>
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-primary text-primary-foreground hover:opacity-90 h-10 px-4 rounded-lg"
          >
            <Send size={18} className="mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
