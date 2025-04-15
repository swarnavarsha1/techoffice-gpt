import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { useChat, CHAT_MODES, MODE_EXPLANATIONS } from '../../contexts/ChatContext';

const ModeSelector = () => {
  const { mode, changeMode } = useChat();
  const [showInfo, setShowInfo] = useState(null);
  
  const modeColors = {
    [CHAT_MODES.RAG]: 'bg-green-100 text-green-800 border-green-200',
    [CHAT_MODES.SEARCH]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [CHAT_MODES.BASIC]: 'bg-blue-100 text-blue-800 border-blue-200',
    [CHAT_MODES.SUMMARIZE]: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const modeRings = {
    [CHAT_MODES.RAG]: 'ring-green-500',
    [CHAT_MODES.SEARCH]: 'ring-yellow-500',
    [CHAT_MODES.BASIC]: 'ring-blue-500',
    [CHAT_MODES.SUMMARIZE]: 'ring-purple-500',
  };
  
  const handleModeChange = (newMode) => {
    changeMode(newMode);
    setShowInfo(null);
  };
  
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        {Object.values(CHAT_MODES).map((modeOption) => (
          <div key={modeOption} className="relative">
            <button
              onClick={() => handleModeChange(modeOption)}
              className={`w-full px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                mode === modeOption 
                  ? `${modeColors[modeOption]} ring-2 ring-offset-1 ${modeRings[modeOption]}`
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="pr-4">{modeOption}</span>
            </button>
            <button 
              className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 p-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo(showInfo === modeOption ? null : modeOption);
              }}
            >
              <FiInfo size={12} />
            </button>
          </div>
        ))}
      </div>
      
      {showInfo && (
        <div className="mb-3 p-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700">
          {MODE_EXPLANATIONS[showInfo]}
        </div>
      )}
    </div>
  );
};

export default ModeSelector;