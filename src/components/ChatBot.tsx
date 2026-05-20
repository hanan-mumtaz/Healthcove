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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Window */}
      {isOpen && (
        <div className="mb-4 w-96 max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 flex flex-col h-96 md:h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-Mg to-Lg text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-bold">HealthCove Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50/30 to-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.role === 'user'
                      ? 'bg-Mg text-white rounded-br-none'
                      : 'bg-white border border-emerald-100 text-slate-900 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-100 px-4 py-2 rounded-lg rounded-bl-none">
                  <Loader2 className="w-4 h-4 animate-spin text-Mg" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-emerald-100 p-3 bg-white/50 rounded-b-2xl flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about nutrition..."
              className="flex-1 px-3 py-2 bg-white/80 border border-emerald-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-Mg/50 placeholder-slate-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-Mg hover:bg-Lg disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-Mg to-Lg hover:shadow-lg transform hover:scale-110 text-white p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}
