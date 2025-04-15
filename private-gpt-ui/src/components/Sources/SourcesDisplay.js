import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFile, FiExternalLink } from 'react-icons/fi';

const SourcesDisplay = ({ sources }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!sources || sources.length === 0) return null;
  
  // Create a unique list of sources by file name and page
  const uniqueSources = [];
  const uniqueFilePages = new Set();
  
  sources.forEach(source => {
    const filePageKey = `${source.file || source.document}-${source.page || ''}`;
    if (!uniqueFilePages.has(filePageKey)) {
      uniqueFilePages.add(filePageKey);
      uniqueSources.push(source);
    }
  });
  
  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800"
      >
        <span className="inline-flex items-center">
          <FiExternalLink className="mr-1.5" size={14} />
          SOURCES ({uniqueSources.length})
        </span>
        {expanded ? (
          <FiChevronUp className="ml-1.5" size={14} />
        ) : (
          <FiChevronDown className="ml-1.5" size={14} />
        )}
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-2 bg-gray-50 p-3 rounded-md border border-gray-200">
          {uniqueSources.map((source, index) => {
            // Determine filename - could be in source.file or source.document
            const filename = source.file || source.document || 'Unknown Source';
            const page = source.page ? `(page ${source.page})` : '';
            
            return (
              <div 
                key={index}
                className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex items-center bg-indigo-50 px-3 py-2 border-b border-indigo-100">
                  <FiFile className="mr-1.5 text-indigo-600" size={14} />
                  <span className="text-xs font-medium text-indigo-700 truncate flex-grow">
                    {filename} {page}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-700 whitespace-pre-wrap">
                    {(source.text || source.content || '').trim()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SourcesDisplay;