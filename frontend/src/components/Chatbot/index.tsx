import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Chatbot.module.css';
import { ChatIcon, CloseIcon, SendIcon, RobotIcon } from './Icons';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selection, setSelection] = useState<string | null>(null);
  const [contextText, setContextText] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection()?.toString().trim();
      
      if (selectedText && selectedText.length > 5) { // Reduced threshold slightly
        const range = window.getSelection()?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        
        if (rect) {
          setSelection(selectedText);
          setPopupPos({
            x: rect.left + rect.width / 2,
            y: rect.top
          });
        }
      } else {
        // Only clear if we aren't clicking the popup itself (handled by click event propagation usually, but simple here)
        // We'll rely on the fact that clicking the popup triggers its handler before this might clear it if we are careful.
        // Actually, easiest to just clear on any mouseup that isn't a selection.
        setSelection(null);
      }
    };

    // Use onMouseUp attached to document to catch selections
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleContextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInput(selection || '');
    setContextText(null); // Ensure we don't use the separate context mode
    setIsOpen(true);
    setSelection(null);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = { role: 'user', content: text };
    const newMessages: Message[] = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    if (!isOpen) setIsOpen(true);

    try {
      const endpoint = contextText ? '/api/v1/chat/selected' : '/api/v1/chat/full';
      
      // Fix: Use window.location to detect environment instead of process.env to avoid "process is not defined" error
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const prodApiUrl = 'https://zakheerali-rag-chatbot-backend.hf.space'; 
      const baseUrl = isLocal ? 'http://localhost:8000' : prodApiUrl;

      const body = contextText 
        ? { message: text, selection: contextText, history: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })) }
        : { message: text, history: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })) };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error (${response.status}): ${errorText}`);
      }

      if (!response.body) throw new Error("No response body");

      // 2. Add Placeholder Bot Message
      const botMsg: Message = { role: 'bot', content: '' };
      setMessages((prev) => [...prev, botMsg]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value || new Uint8Array(), { stream: !done });
        buffer += chunkValue;

        const lines = buffer.split('\n');
        // Keep the last partial line in buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const json = JSON.parse(line);
            if (json.type === 'chunk') {
              setMessages((prev) => {
                const updated = [...prev];
                const lastMsg = updated[updated.length - 1];
                if (lastMsg.role === 'bot') {
                  lastMsg.content += json.data;
                }
                return updated;
              });
            } else if (json.type === 'sources') {
              console.log("Sources:", json.data);
              // Future: Update UI to show sources
            } else if (json.type === 'error') {
              console.error("Stream error:", json.data);
              throw new Error(json.data);
            }
          } catch (e) {
            console.error("Error parsing JSON chunk", e);
          }
        }
      }

    } catch (error: any) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, { role: 'bot', content: `Error: ${error.message || 'Unknown error'}` }]);
    } finally {
      setIsLoading(false);
      setContextText(null); // Clear context after sending
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {selection && (
        <div 
          className={styles.selectionPopup}
          style={{ left: popupPos.x, top: popupPos.y }}
          onMouseDown={(e) => {
            e.preventDefault(); // Prevent text deselection
            e.stopPropagation();
            handleContextClick(e);
          }}
        >
          Ask AI about this
        </div>
      )}

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerTitle}>
              <RobotIcon size={24} />
              <span>Robotics Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className={styles.closeButton}
              aria-label="Close chat"
            >
              <CloseIcon size={20} />
            </button>
          </div>

          <div className={styles.chatMessages}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', opacity: 0.6, marginTop: '2rem' }}>
                <RobotIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p>Hello! I can help you with your robotics questions.</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={clsx(styles.message, msg.role === 'user' ? styles.userMessage : styles.botMessage)}
              >
                {msg.content}
              </div>
            ))}
            
            {isLoading && (
              <div className={styles.typingIndicator}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className={styles.chatInputArea} onSubmit={(e) => { e.preventDefault(); handleSend(input); }}>
            {contextText && (
              <div className={styles.contextPreview}>
                <span>Selected: <strong>{contextText.substring(0, 30)}...</strong></span>
                <button type="button" onClick={() => setContextText(null)}>
                  <CloseIcon size={14} />
                </button>
              </div>
            )}
            <div className={styles.inputRow}>
              <input 
                ref={inputRef}
                className={styles.chatInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={contextText ? "Ask about selection..." : "Ask a question..."}
              />
              <button 
                type="submit" 
                className={styles.sendButton} 
                disabled={isLoading || (!input.trim() && !contextText)}
                aria-label="Send message"
              >
                <SendIcon size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
      
      <button 
        className={styles.chatButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? <CloseIcon size={28} /> : <ChatIcon size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;
