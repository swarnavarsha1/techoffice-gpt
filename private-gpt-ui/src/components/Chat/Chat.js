import React, { useRef, useEffect, useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ModeSelector from '../ModeSelector/ModeSelector';
import SystemPromptInput from '../SystemPrompt/SystemPromptInput';
import { useChat, CHAT_MODES } from '../../contexts/ChatContext';
import { FiSettings } from 'react-icons/fi';

const Chat = () => {
  const { messages, error, mode } = useChat();
  const messagesEndRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // Only show system prompt input if mode needs it
  const showSystemPrompt = mode !== CHAT_MODES.SEARCH;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full">
      {/* Main chat area with centered content */}
      <div className={`${showSettings ? 'flex-1' : 'w-full'} h-full flex flex-col`}>
        <ChatHeader 
          showSettings={showSettings} 
          setShowSettings={setShowSettings} 
        />
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            {messages.length === 0 ? (
              <div className="h-full min-h-[70vh] flex flex-col items-center justify-center text-center">
                <img 
                  src="/techoffice-logo.png" 
                  alt="TechOffice GPT" 
                  className="w-20 h-20 mx-auto mb-6 rounded-full shadow-md"
                />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  What can I help with?
                </h3>
                <p className="text-gray-600 max-w-lg">
                  Start a conversation by typing a message below. You can upload documents to enable contextual answers.
                </p>
              </div>
            ) : (
              <div className="py-4">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                {error && (
                  <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    <p className="text-sm font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
        
        {/* Centered input box with max width */}
        <div className="px-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput />
          </div>
        </div>
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <div className="w-72 flex-shrink-0 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-gray-800">Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <FiSettings size={16} />
              </button>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Interaction Mode</h3>
            <ModeSelector />
          </div>
          
          {showSystemPrompt && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">System Prompt</h3>
              <SystemPromptInput />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chat;