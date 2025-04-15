import React from 'react';
import { FiFolder, FiMessageSquare } from 'react-icons/fi';

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex ml-4">
      <button
        className={`flex items-center px-4 py-2 mr-2 rounded-md transition-colors ${
          currentPage === 'files' 
            ? 'bg-indigo-100 text-indigo-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setCurrentPage('files')}
      >
        <FiFolder 
          className={`mr-2 ${currentPage === 'files' ? 'text-indigo-600' : 'text-gray-500'}`} 
          size={16} 
        />
        Documents
      </button>
      
      <button
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          currentPage === 'chat' 
            ? 'bg-indigo-100 text-indigo-700 font-medium' 
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setCurrentPage('chat')}
      >
        <FiMessageSquare 
          className={`mr-2 ${currentPage === 'chat' ? 'text-indigo-600' : 'text-gray-500'}`} 
          size={16} 
        />
        Chat
      </button>
    </div>
  );
};

export default Navigation;