
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Namaste! I am your BharatProp Assistant. How can I help you with your trading journey today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            You are "BharatProp AI", the official virtual assistant for BharatProp - Built by Indians for Indian Traders.
            Tone: Professional, helpful, institutional, yet approachable.
            
            Key Information you must know:
            - Capital: Up to ₹2 Crore funding for talented traders.
            - Execution: Every trade is executed via Zerodha Kite Connect API.
            - Profit Share: Traders keep up to 90% of profits.
            - Payouts: Weekly payouts every Friday.
            - Daily Loss Limit: Hard 5% limit (equity-based).
            - Max Drawdown: Hard 10% static limit.
            - Evaluation Phases: 
                - 1-Step (Rapid): 10% Profit Target.
                - 2-Step: Phase 1 (8% Target), Phase 2 (5% Target).
            - Minimum Days: 3 trading days required.
            - Leverage: Up to 1:100 on Nifty/BankNifty/Equity via Zerodha.
            - Values: Built by Indians, specifically for the needs of Indian Traders.
            
            Always mention Zerodha if asked about where trades are executed.
            Be concise and don't use too much formatting.
          `,
        },
      });

      const aiText = response.text || "I apologize, I'm having trouble connecting to the terminal. Please try again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error: Could not reach the AI core. Check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 group-hover:opacity-80 transition-opacity"></div>
        {isOpen ? (
          <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-white relative z-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-[#0f172a]/95 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-black text-xl">B</span>
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight text-white uppercase">BharatProp AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">Always Active</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900/50 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about rules, payout, Zerodha..."
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-4 pl-5 pr-12 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 p-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-3">
              Official Institutional Assistant
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
