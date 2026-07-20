'use client';

import { getChatBot } from "@/lib/action/destinations";
import { useState, useRef, useEffect } from "react";

export default function ChatBox() {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    const handleSend = async (textToSend) => {
        const queryText = textToSend || message;
        if (!queryText.trim() || loading) return;

        const updatedHistoryForBackend = chatHistory.map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            text: msg.text
        }));

        const userMessage = { id: Date.now(), sender: "user", text: queryText };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage("");
        setSuggestions([]);
        setLoading(true);

        try {
            const response = await getChatBot({
                message: queryText,
                history: updatedHistoryForBackend
            });

            if (response.success) {
                setChatHistory(prev => [
                    ...prev,
                    { id: Date.now() + 1, sender: "bot", text: response.reply }
                ]);
                if (response.suggestions && Array.isArray(response.suggestions)) {
                    setSuggestions(response.suggestions);
                }
            } else {
                setChatHistory(prev => [
                    ...prev,
                    { id: Date.now() + 1, sender: "bot", text: response.message || "Something went wrong." }
                ]);
            }
        } catch (err) {
            setChatHistory(prev => [
                ...prev,
                { id: Date.now() + 1, sender: "bot", text: err.message || "Failed to communicate with AI server." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-[650px] w-full bg-gradient-to-b from-base-100 via-base-100 to-base-200/30 rounded-2xl overflow-hidden relative">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-base-content/10">
                {chatHistory.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto animation-fade-in">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-120 animate-pulse"></div>
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-focus flex items-center justify-center text-primary-content shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-8.983m-8.982 0L15 3.043L14.187 8.15m-4.375 7.755L14.187 8.15m0 0H21m-7.813 7.755H3" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-extrabold text-base-content tracking-tight">Discover with Roam Mind AI</h3>
                        <p className="text-sm text-base-content/60 mt-2 leading-relaxed">
                            Your computational travel companion. Inquire about custom itineraries, historical points, hidden landmarks, or overall logistics.
                        </p>
                    </div>
                )}

                {chatHistory.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold tracking-wider select-none shrink-0 border ${
                            msg.sender === "user"
                                ? "bg-primary text-primary-content border-primary"
                                : "bg-base-300 text-base-content border-base-content/10"
                        }`}>
                            {msg.sender === "user" ? "US" : "RM"}
                        </div>

                        <div className={`relative p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm transition-all whitespace-pre-wrap ${
                            msg.sender === "user"
                                ? "bg-gradient-to-br from-primary to-primary-focus text-primary-content rounded-tr-none"
                                : "bg-base-100 text-base-content border border-base-content/10 rounded-tl-none backdrop-blur-md"
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex items-start gap-3 flex-row">
                        <div className="w-8 h-8 rounded-lg bg-base-300 text-base-content border border-base-content/10 flex items-center justify-center text-xs font-bold shrink-0">
                            RM
                        </div>
                        <div className="bg-base-100 border border-base-content/10 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                
                <div ref={chatEndRef} />
            </div>

            {suggestions.length > 0 && (
                <div className="px-6 py-3 bg-gradient-to-t from-base-200/40 to-transparent backdrop-blur-sm flex flex-col gap-2 border-t border-base-content/5">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-base-content/40 px-1">Suggested Directions</span>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSend(suggestion)}
                                className="px-4 py-2 text-xs bg-base-100 border border-base-content/10 hover:border-primary text-base-content/80 hover:text-primary rounded-xl font-medium transition-all duration-200 shadow-sm active:scale-95 text-left"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="p-4 bg-base-100 border-t border-base-content/10 shadow-lg">
                <div className="flex items-center gap-2 bg-base-200/50 border border-base-content/10 rounded-2xl p-2.5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300">
                    <textarea
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Message Roam Mind..."
                        className="textarea bg-transparent border-none outline-none focus:outline-none focus:border-none w-full resize-none py-1.5 px-3 text-base-content text-sm leading-relaxed min-h-[38px] max-h-[100px] overflow-y-auto scrollbar-none"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={loading || !message.trim()}
                        className="w-10 h-10 bg-primary hover:bg-primary-focus disabled:bg-base-300 text-primary-content disabled:text-base-content/30 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 shadow-md active:scale-95"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform rotate-45 -translate-x-0.5 translate-y-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}