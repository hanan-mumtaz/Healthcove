import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { sendMessageToChatbot } from '../services/chatbotService';
import type { ChatMessage } from '../chatbot.types';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! 👋 I\'m HealthCove\'s nutrition assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Convert messages to Gemini format
      const conversationHistory: GeminiMessage[] = messages
        .filter((m) => m.id !== '1') // Exclude initial greeting
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

      // Get response from Gemini
      const response = await sendMessageToChatbot(inputValue, conversationHistory);

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // FIX 1: Changed right-6 to right-4 on mobile to prevent overflow
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3">
      
      {/* Chatbot Window */}
      {isOpen && (
        // FIX 2: Replaced 90vw with calc(100vw-2rem) to perfectly align with the right-4 margin
        // FIX 3: Replaced 70vh with dvh (Dynamic Viewport Height) to respect mobile browser UI bars
        <div className="w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 flex flex-col h-[calc(100dvh-8rem)] sm:h-[500px] max-h-[600px] overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-Mg to-Lg text-white p-4 rounded-t-2xl flex items-center justify-between flex-shrink-0 gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold truncate text-sm sm:text-base">HealthCove Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 -mr-2 rounded-lg transition-all flex-shrink-0"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50/30 to-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-Mg text-white rounded-br-sm'
                      : 'bg-white border border-emerald-100 text-slate-900 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-Mg" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-emerald-100 p-3 bg-white/90 rounded-b-2xl flex gap-2 flex-shrink-0 items-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about nutrition..."
              // FIX 4: Changed text-xs to text-base (16px) to PREVENT iOS Safari auto-zoom
              className="flex-1 px-4 py-3 bg-white border border-emerald-100 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-Mg/50 placeholder-slate-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              // FIX 5: Better touch target padding for mobile devices
              className="bg-Mg hover:bg-Lg disabled:opacity-50 text-white p-3 rounded-xl transition-colors flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-Mg to-Lg hover:shadow-lg transform hover:scale-110 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center flex-shrink-0 relative group"
        title={isOpen ? "Close chat" : "Chat with us"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-Mg rounded-full animate-pulse" />
          </div>
        )}
        {!isOpen && (
          <div className="hidden sm:block absolute bottom-full right-0 mb-2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with us!
          </div>
        )}
      </button>
    </div>
  );
}