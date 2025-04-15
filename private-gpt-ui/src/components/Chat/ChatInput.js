import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiFile, FiLoader } from 'react-icons/fi';
import { useChat, CHAT_MODES } from '../../contexts/ChatContext';
import { useFiles } from '../../contexts/FilesContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isLoading, mode } = useChat();
  const { selectedFile, getContextFilter } = useFiles();
  const textareaRef = useRef(null);

  // Dynamically adjust height of textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [message]);

  const handleSend = async () => {
    if (message.trim() && !isLoading) {
      const trimmedMessage = message.trim();
      setMessage('');
      
      // Get context filter if needed for RAG or SUMMARIZE modes
      let contextFilter = null;
      if ((mode === CHAT_MODES.RAG || mode === CHAT_MODES.SUMMARIZE) && selectedFile) {
        contextFilter = await getContextFilter();
      }
      
      await sendMessage(trimmedMessage, contextFilter);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  let placeholderText = 'Type your message...';
  if (mode === CHAT_MODES.RAG && !selectedFile) {
    placeholderText = 'Select a file to use context or type for general questions...';
  } else if (mode === CHAT_MODES.SUMMARIZE && !selectedFile) {
    placeholderText = 'Select a file to summarize...';
  } else if (mode === CHAT_MODES.SEARCH && !selectedFile) {
    placeholderText = 'Select a file to search in...';
  }

  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50">
      {selectedFile && (
        <div className="mb-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-md inline-flex items-center">
          <FiFile className="text-indigo-500 mr-2" size={14} />
          <span className="text-xs font-medium text-indigo-700 truncate max-w-xs">
            Using: {selectedFile}
          </span>
        </div>
      )}
      
      <div className="relative flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          rows={1}
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none shadow-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className={`absolute right-3 bottom-3 p-2 rounded-full transition-colors ${
            !message.trim() || isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
          }`}
        >
          {isLoading ? <FiLoader className="animate-spin" /> : <FiSend />}
        </button>
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse mr-1"></div>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse mr-1" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse mr-1" style={{ animationDelay: '0.4s' }}></div>
          <span className="ml-1">Processing your request</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;