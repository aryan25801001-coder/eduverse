import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, CornerDownRight, Loader2, Copy, RefreshCw, Square } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

// Ensure you replace this with your actual API endpoint or use environment variables
const API_BASE_URL = 'http://localhost:8000/api';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  roadmap?: string[];
}

export const AIMentorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am your **EduVerse AI Mentor**.\n\nI act as your personal career coach. How can I help you today?\n\n*Try asking:*\n- *Create an AI Engineer roadmap*\n- *Can you review my resume?*\n- *I am weak in Python, what should I do?*",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Mock user_id for now - in production, get this from AuthContext
      const userId = 'user123'; 
      
      const response = await axios.post(`${API_BASE_URL}/ai/mentor/chat`, {
        user_id: userId,
        message: currentInput
      });
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.data.response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I experienced an error connecting to my core brain. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 hover:scale-105 transition shadow-lg shadow-indigo-500/30 text-white cursor-pointer group"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-2 -right-1 px-1.5 py-0.5 text-[9px] font-bold text-white bg-indigo-900 rounded-full border border-purple-500 animate-pulse">AI</span>
        </button>
      )}

      {/* Expanded Chat Container - SOLID BACKGROUND FIX */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[600px] bg-[#0d1117] border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#161b22] border-b border-slate-700/50 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">EduVerse AI Mentor</h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Active
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-5 bg-[#0d1117]">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[90%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-sm
                  ${msg.sender === 'ai' ? 'bg-indigo-600' : 'bg-purple-600'}`}
                >
                  {msg.sender === 'ai' ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2 w-full">
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed
                    ${msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-[#161b22] text-slate-200 border border-slate-700/50 rounded-tl-none shadow-sm'}`}
                  >
                    {msg.sender === 'user' ? (
                      <p className="whitespace-pre-line">{msg.text}</p>
                    ) : (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#090c10] prose-pre:border prose-pre:border-slate-800">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Bar for AI Messages */}
                  {msg.sender === 'ai' && (
                    <div className="flex items-center gap-2 px-1">
                      <button onClick={() => copyToClipboard(msg.text)} className="text-slate-500 hover:text-slate-300 p-1" title="Copy">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-4.5 h-4.5 animate-bounce" />
                </div>
                <div className="p-4 bg-[#161b22] border border-slate-700/50 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <div className="p-4 bg-[#161b22] border-t border-slate-700/50">
            <form onSubmit={handleSendMessage} className="flex gap-2 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask for guidance, a roadmap, or resume review..."
                className="flex-1 bg-[#0d1117] border border-slate-700 focus:border-indigo-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={isTyping || !inputText.trim()}
                className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center shadow-md"
              >
                {isTyping ? <Square className="w-4 h-4 fill-current" /> : <Send className="w-4.5 h-4.5" />}
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-500">EduVerse AI Mentor can make mistakes. Check important info.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
