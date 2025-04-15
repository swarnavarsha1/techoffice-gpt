import React, { createContext, useState, useContext } from 'react';
import { ChatApi } from '../api/chatApi';

// Chat modes matching the backend
export const CHAT_MODES = {
  RAG: 'RAG',
  SEARCH: 'Search',
  BASIC: 'Basic',
  SUMMARIZE: 'Summarize'
};

// Define mode explanations
export const MODE_EXPLANATIONS = {
  [CHAT_MODES.RAG]: "Get contextualized answers from selected files.",
  [CHAT_MODES.SEARCH]: "Find relevant chunks of text in selected files.",
  [CHAT_MODES.BASIC]: "Chat with the LLM using its training data. Files are ignored.",
  [CHAT_MODES.SUMMARIZE]: "Generate a summary of the selected files. Prompt to customize the result."
};

// Create the context
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Chat state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(CHAT_MODES.RAG);
  const [systemPrompt, setSystemPrompt] = useState('');
  
  // Default system prompts based on mode
  const defaultSystemPrompts = {
    [CHAT_MODES.RAG]: "You are a helpful AI assistant that answers questions based on the provided documents.",
    [CHAT_MODES.BASIC]: "You are a helpful AI assistant.",
    [CHAT_MODES.SUMMARIZE]: "You are an AI assistant specialized in summarizing documents. Create concise, accurate summaries of the documents provided."
  };

  // Set mode and corresponding system prompt
  const changeMode = (newMode) => {
    setMode(newMode);
    setSystemPrompt(defaultSystemPrompts[newMode] || '');
  };

  // Add a message to the chat
  const addMessage = (role, content, sources = null) => {
    const newMessage = { role, content, sources };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    return newMessage;
  };

  // Send a message to the API
  const sendMessage = async (content, contextFilter = null) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Add user message to the chat
      addMessage('user', content);

      // Prepare messages for API
      const apiMessages = [];
      
      // Add system message if available
      if (systemPrompt) {
        apiMessages.push({ role: 'system', content: systemPrompt });
      }
      
      // Add conversation history (max 20 messages to avoid context overflow)
      messages.slice(-20).forEach(msg => {
        apiMessages.push({ role: msg.role, content: msg.content });
      });
      
      // Add current message
      apiMessages.push({ role: 'user', content });
      
      // Determine if we need context based on mode
      const useContext = [CHAT_MODES.RAG, CHAT_MODES.SUMMARIZE].includes(mode);
      
      // Based on mode, determine what to do
      let response;
      switch(mode) {
        case CHAT_MODES.SEARCH:
          // For search mode, we handle differently
          // Implement search-specific logic if needed
          break;
        default:
          // Regular chat completion
          response = await ChatApi.sendChatMessage(
            apiMessages,
            useContext,
            contextFilter,
            true,
            false
          );
          
          // Process the response
          const assistantContent = response.choices[0].message.content;
          
          // Extract sources if available
          const sources = response.choices?.[0]?.message?.context?.sources || null;
          
          // Add assistant response to chat
          addMessage('assistant', assistantContent, sources);
          break;
      }
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([]);
  };

  // Context value
  const value = {
    messages,
    isLoading,
    error,
    mode,
    systemPrompt,
    sendMessage,
    addMessage,
    clearChat,
    changeMode,
    setSystemPrompt,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Hook for using chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};