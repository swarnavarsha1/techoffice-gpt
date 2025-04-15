import React from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';
import FileActions from './FileActions';
import { FiList, FiMessageCircle } from 'react-icons/fi';
import { useFiles } from '../../contexts/FilesContext';

const FileManagement = ({ onComplete }) => {
  const { selectedFile } = useFiles();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-800 flex items-center">
          <FiList className="mr-1.5 text-indigo-600" size={16} />
          Document Management
        </h2>
        
        {selectedFile && (
          <button
            onClick={onComplete}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
          >
            <FiMessageCircle className="mr-1.5" size={14} />
            Continue to Chat
          </button>
        )}
      </div>
      
      {/* Scrollable content area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Upload Files</h3>
            </div>
            <div className="p-4">
              <FileUpload />
            </div>
          </div>
          
          {/* Info section */}
          <div className="bg-indigo-50 rounded-lg border border-indigo-100 overflow-hidden">
            <div className="px-4 py-3 bg-indigo-100 border-b border-indigo-200">
              <h3 className="text-sm font-medium text-indigo-700">How It Works</h3>
            </div>
            <div className="p-4">
              <ul className="text-sm text-gray-600 space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-indigo-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                  <span>Upload documents to chat with your data</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-indigo-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                  <span>Select files before chatting to use them as context</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-indigo-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                  <span>Continue to Chat when you're ready to ask questions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 bg-indigo-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                  <span>Switch interaction modes to customize how the AI responds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* File management section */}
        <div className="mt-6 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">Manage Files</h3>
          </div>
          <div className="p-4">
            <FileList />
            <FileActions />
          </div>
        </div>
        
        {/* Selected file indicator */}
        {selectedFile && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <div className="text-sm font-medium text-green-800">Ready to chat!</div>
            </div>
            <p className="mt-1 text-xs text-gray-600 ml-4">
              You have selected "{selectedFile}". Click "Continue to Chat" to start using this document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManagement;