import React, { useState } from 'react';
import { FiRefreshCw, FiCheck, FiEdit2 } from 'react-icons/fi';
import { useChat } from '../../contexts/ChatContext';

const SystemPromptInput = () => {
  const { systemPrompt, setSystemPrompt } = useChat();
  const [localPrompt, setLocalPrompt] = useState(systemPrompt);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSystemPrompt(localPrompt);
    setIsEditing(false);
    
    // Show saved indicator briefly
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    // Reset to default prompt based on mode
    setLocalPrompt(systemPrompt);
    setIsEditing(false);
  };

  return (
    <div className="mb-4">
      {!isEditing ? (
        <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-gray-700 flex items-center">
              System Prompt
              {saved && (
                <span className="ml-2 text-xs text-green-600 flex items-center">
                  <FiCheck size={12} className="mr-1" />
                  Saved
                </span>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              title="Edit system prompt"
            >
              <FiEdit2 size={14} />
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded p-2 text-sm text-gray-800 max-h-32 overflow-y-auto">
            {systemPrompt || 'No system prompt set.'}
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            System Prompt
          </label>
          <textarea
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[100px] text-sm"
            placeholder="Enter a system prompt to guide the AI..."
          />
          
          <div className="mt-2 flex space-x-2">
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
              title="Reset to default"
            >
              <FiRefreshCw size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemPromptInput;