import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ChevronDown, RotateCcw } from 'lucide-react';

const SYSTEM_PROMPT = `You are an expert OPPO retail coach. Your headline is 'Ask me anything about OPPO devices in the UK.' Your knowledge is strictly limited to OPPO smartphones, tablets, and wearables. If asked about a competitor device, politely decline and pivot the conversation back to OPPO's unique selling points, such as the Find X10 Pro Max's Triple 200MP camera, 7150mAh battery, and ColorOS features. Keep your answers concise, energetic, and focused on helping retail teams close the sale.`;

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'model',
    text: "Hi there! 👋 I'm your dedicated OPPO Retail Coach. Ask me anything about OPPO devices in the UK—from closing pitch lines to tech specs!"
  }
];

const SUGGESTED_QUESTIONS = [
  "Pitch the Triple 200MP camera to a customer",
  "Why is the 7150mAh battery a game-changer?",
  "What if a customer asks for a Samsung or iPhone?",
  "Key selling points of the Dimensity 9600 Pro"
];

export default function SalesAssistant({ defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return defaultOpen || params.get('assistant') === 'open';
    }
    return defaultOpen;
  });
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isLoading]);

  /**
   * Calls the Gemini API endpoint passing chat history and prepending the system instructions
   */
  const callGeminiAPI = async (chatHistory) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      console.warn('VITE_GEMINI_API_KEY is not defined in environment variables. Providing retail coaching response.');
      setApiKeyError(true);

      // Smart fallback answering common retail questions
      const lastUserMsg = chatHistory[chatHistory.length - 1]?.parts?.[0]?.text?.toLowerCase() || '';
      
      if (lastUserMsg.includes('camera') || lastUserMsg.includes('200mp')) {
        return "📸 **Camera Pitch for Customers:**\n\"The Find X10 Pro Max is the world's first smartphone with a **Triple 200MP Camera** co-developed with Hasselblad. That means whether your customer is taking an ultra-wide landscape, a main snapshot, or zooming in at 120X with the dual periscope, every single lens captures 200 million pixels of razor-sharp detail!\"\n\n*(Note: Add `VITE_GEMINI_API_KEY` to `.env` for full dynamic Gemini 1.5 Flash responses)*";
      }

      if (lastUserMsg.includes('battery') || lastUserMsg.includes('7150') || lastUserMsg.includes('charging') || lastUserMsg.includes('80w')) {
        return "⚡ **Power & Battery Pitch:**\n\"Tell them about the **7,150mAh Silicon-Carbon battery**—it delivers over two full days of battery life! Paired with **80W SUPERVOOC**, they can top up in minutes with a certified **6-year battery health longevity** guarantee!\"\n\n*(Note: Add `VITE_GEMINI_API_KEY` to `.env` for full dynamic Gemini 1.5 Flash responses)*";
      }

      if (lastUserMsg.includes('samsung') || lastUserMsg.includes('iphone') || lastUserMsg.includes('apple') || lastUserMsg.includes('pixel')) {
        return "🎯 **Competitor Pivot Strategy:**\n\"I hear you, both are great devices, but let me show you what makes OPPO stand apart right now: You get the world's only **Triple 200MP camera system**, double the typical battery capacity with **7,150mAh**, and lightning-fast **80W charging** in the box that leaves standard charging speeds far behind!\"\n\n*(Note: Add `VITE_GEMINI_API_KEY` to `.env` for full dynamic Gemini 1.5 Flash responses)*";
      }

      return "👋 **Retail Coaching Tip:**\n\"Focus on customer pain points: battery life and photo quality. Lead with the **Find X10 Pro Max's 7,150mAh battery** and **Triple 200MP Hasselblad camera system** to instantly grab their attention and close the sale!\"\n\n*(Note: Connect your `VITE_GEMINI_API_KEY` in `.env` to ask open-ended questions to Gemini 1.5 Flash)*";
    }

    setApiKeyError(false);

    // Structure the contents array for Gemini chat history
    // role: 'user' | 'model'
    const contents = chatHistory.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: msg.parts || [{ text: msg.text }]
    }));

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error response:', errorData);
      throw new Error(errorData?.error?.message || `API error (${response.status})`);
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0];
    const botReply = candidate?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error('No response returned by Gemini API.');
    }

    return botReply;
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query
    };

    // Update conversation state with user query
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Exclude initial local greeting if needed, or pass full dialogue
      const apiHistory = updatedHistory.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const replyText = await callGeminiAPI(apiHistory);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: replyText
        }
      ]);
    } catch (error) {
      console.error('Error contacting Gemini AI:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'model',
          text: `⚠️ Unable to reach OPPO Retail Coach: ${error.message}. Please check your connection or API key.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setApiKeyError(false);
  };

  return (
    <>
      {/* Floating Action Button (FAB) in Bottom Right Corner */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open OPPO Sales Assistant"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-warm-orange text-white shadow-lg hover:shadow-xl hover:bg-opacity-95 active:scale-95 transition-all duration-200 group"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden xs:inline sm:inline">
            OPPO Sales AI
          </span>
        </button>
      )}

      {/* Slide-Up Chat Modal Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-end justify-center sm:justify-end sm:p-6 pointer-events-none">
          {/* Backdrop on mobile */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-xs pointer-events-auto sm:hidden transition-opacity"
          />

          {/* Chat Container */}
          <div className="pointer-events-auto w-full sm:w-[400px] h-[85vh] sm:h-[600px] max-h-[90vh] bg-moon-white border border-light-titanium rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250 select-none">
            {/* Header */}
            <div className="px-4 py-3.5 bg-white/95 backdrop-blur-md border-b border-light-titanium flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-warm-orange flex items-center justify-center text-white shadow-md shadow-warm-orange/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-titanium-dark leading-tight">
                      OPPO Retail Coach
                    </h3>
                  </div>
                  <p className="text-[10px] text-titanium-dark/70 font-medium line-clamp-1">
                    Ask me anything about OPPO devices in the UK
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-titanium-dark/60 hover:text-titanium-dark hover:bg-light-titanium/50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="p-1.5 rounded-lg text-titanium-dark/60 hover:text-titanium-dark hover:bg-light-titanium/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* API Key Warning Alert if missing */}
            {apiKeyError && (
              <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-amber-900 text-[11px] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  Add <code>VITE_GEMINI_API_KEY</code> to <code>.env</code> to connect directly to Google Gemini.
                </span>
              </div>
            )}

            {/* Messages Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-24 no-scrollbar">
              {messages.map((msg) => {
                if (msg.role === 'user') {
                  // User's message bubble: Warm Orange (bg-orange-500 text-white) with rounded-2xl rounded-br-sm
                  return (
                    <div key={msg.id} className="flex justify-end items-end">
                      <div className="bg-orange-500 text-white rounded-2xl rounded-br-sm p-3 sm:p-3.5 text-xs sm:text-sm font-medium leading-relaxed max-w-[82%] shadow-sm">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                // AI's message bubble: Soft Gray / Light Titanium (bg-gray-100 text-gray-800) with rounded-2xl rounded-bl-sm
                // Accompanied by a clean circular avatar for the OPPO Retail Coach
                return (
                  <div key={msg.id} className="flex justify-start items-end gap-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-light-titanium flex items-center justify-center flex-shrink-0 text-orange-500 shadow-sm mb-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm p-3 sm:p-3.5 text-xs sm:text-sm font-medium leading-relaxed max-w-[85%] shadow-sm whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Bot Loading / Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-light-titanium flex items-center justify-center flex-shrink-0 text-orange-500 shadow-sm mb-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 text-xs shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] text-gray-600 font-semibold ml-1">Retail Coach is typing...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sticky Input Container pinned to bottom with pb-8 for iPhone home bar */}
            <div className="fixed bottom-0 left-0 right-0 w-full sm:static sm:w-full bg-white/95 backdrop-blur-md border-t border-light-titanium flex-shrink-0 z-30 pb-8 sm:pb-3">
              {/* Quick Prompt Suggestion Chips (when only 1 or 2 messages exist) */}
              {messages.length <= 2 && (
                <div className="px-3 pt-2 pb-1.5 flex flex-wrap gap-1.5 border-b border-light-titanium/40">
                  {SUGGESTED_QUESTIONS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      disabled={isLoading}
                      className="text-[10px] sm:text-[11px] bg-white hover:bg-light-titanium/40 border border-light-titanium rounded-full px-2.5 py-1 text-titanium-dark/80 font-medium transition-all active:scale-95 text-left disabled:opacity-50"
                    >
                      💡 {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form */}
              <div className="p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about specs, pitches, or closing..."
                    disabled={isLoading}
                    className="flex-1 bg-moon-white border border-light-titanium rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-titanium-dark placeholder-titanium-dark/40 focus:outline-none focus:border-warm-orange focus:ring-1 focus:ring-warm-orange transition-all disabled:opacity-60"
                  />

                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    aria-label="Send question"
                    className="p-2.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-warm-orange/20 transition-all flex items-center justify-center flex-shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
