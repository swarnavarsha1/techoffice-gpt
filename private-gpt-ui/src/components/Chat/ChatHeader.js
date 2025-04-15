import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiInfo, FiSettings } from 'react-icons/fi';
import { useChat, CHAT_MODES } from '../../contexts/ChatContext';
import axios from 'axios';

const ChatHeader = ({ showSettings, setShowSettings }) => {
  const { clearChat, mode, changeMode } = useChat();
  const [modelInfo, setModelInfo] = useState({ llm: 'Loading...', model: 'Loading...' });
  const [showModelInfo, setShowModelInfo] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  
  // Fetch model info on mount
  useEffect(() => {
    const fetchModelInfo = async () => {
      try {
        // Fetch model info from the health endpoint
        const response = await axios.get('/health/model');
        setModelInfo({
          llm: response.data.llm,
          model: response.data.model
        });
      } catch (error) {
        console.error('Error fetching model info:', error);
        
        // Fallback to generic information if the API call fails
        setModelInfo({
          llm: 'unknown',
          model: 'unknown'
        });
      }
    };
    
    fetchModelInfo();
  }, []);

  const getModeColor = () => {
    switch(mode) {
      case 'RAG': return 'bg-green-500';
      case 'Search': return 'bg-yellow-500';
      case 'Summarize': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const handleClickOutside = () => {
    setShowModeDropdown(false);
  };

  useEffect(() => {
    if (showModeDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showModeDropdown]);
  
  const modeOptions = Object.values(CHAT_MODES);

  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-gray-50">
      <div>
        <div className="flex items-center">
          {/* Mode dropdown trigger */}
          <div className="relative">
            <button 
              className="flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-1.5"
              onClick={e => {
                e.stopPropagation();
                setShowModeDropdown(!showModeDropdown);
              }}
            >
              <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${getModeColor()}`}></span>
              <span className="text-sm font-medium">{mode} Mode</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mode dropdown */}
            {showModeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                {modeOptions.map((modeOption) => (
                  <button
                    key={modeOption}
                    className={`w-full text-left px-3 py-2 text-sm ${mode === modeOption ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeMode(modeOption);
                      setShowModeDropdown(false);
                    }}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                      modeOption === 'RAG' ? 'bg-green-500' : 
                      modeOption === 'Search' ? 'bg-yellow-500' : 
                      modeOption === 'Summarize' ? 'bg-purple-500' : 'bg-blue-500'
                    }`}></span>
                    {modeOption}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            className="ml-2 text-gray-400 hover:text-indigo-600"
            onClick={() => setShowModelInfo(!showModelInfo)}
            title="View model information"
          >
            <FiInfo size={16} />
          </button>
        </div>
        
        {showModelInfo && (
          <div className="text-xs text-gray-500 mt-1 bg-gray-100 p-1 rounded">
            LLM: <span className="font-medium">{modelInfo.llm}</span> | 
            Model: <span className="font-medium">{modelInfo.model}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`mr-2 p-2 rounded-md transition-colors ${
            showSettings 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          title={showSettings ? "Hide settings" : "Show settings"}
        >
          <FiSettings size={18} />
        </button>
        
        <button
          onClick={clearChat}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          title="Start a new chat"
        >
          <FiRefreshCw className="mr-1.5" size={14} />
          New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;