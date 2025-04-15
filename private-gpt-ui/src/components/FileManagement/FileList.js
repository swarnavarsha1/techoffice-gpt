import React from 'react';
import { useFiles } from '../../contexts/FilesContext';
import { FiFile, FiCheck, FiLoader } from 'react-icons/fi';

const FileList = () => {
  const { files, selectedFile, setSelectedFile, isLoading } = useFiles();

  // Function to truncate filenames while preserving the extension
  const truncateFilename = (filename, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    
    const extension = filename.split('.').pop();
    const nameWithoutExtension = filename.substring(0, filename.lastIndexOf('.'));
    
    const truncatedName = nameWithoutExtension.substring(0, maxLength - extension.length - 3) + '...';
    return `${truncatedName}.${extension}`;
  };

  if (isLoading) {
    return (
      <div className="mt-3 border border-gray-200 rounded-md bg-gray-50">
        <div className="p-6 flex flex-col items-center justify-center">
          <FiLoader className="animate-spin text-indigo-500 mb-2" size={20} />
          <div className="text-sm text-gray-500">Loading files...</div>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="mt-3 border border-gray-200 rounded-md bg-gray-50">
        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mb-3">
            <FiFile className="text-gray-500" size={24} />
          </div>
          <div className="text-sm font-medium text-gray-700 mb-1">No files yet</div>
          <p className="text-xs text-gray-500">Upload files to use in your conversations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-gray-50 py-2 px-3 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-700">Files ({files.length})</h3>
        <div className="text-xs text-gray-500">
          {selectedFile ? '1 selected' : 'None selected'}
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {files.map((file) => (
          <div 
            key={file} 
            className={`px-3 py-2.5 cursor-pointer hover:bg-gray-50 flex items-center border-b border-gray-100 transition-colors ${
              selectedFile === file ? 'bg-indigo-50' : ''
            }`}
            onClick={() => setSelectedFile(file)}
          >
            <div className={`flex-shrink-0 mr-2 text-gray-400 ${selectedFile === file ? 'text-indigo-500' : ''}`}>
              <FiFile size={16} />
            </div>
            
            <div className="flex-grow">
              <div className="text-sm truncate font-medium text-gray-700">{truncateFilename(file)}</div>
              {file.endsWith('.pdf') && (
                <div className="text-xs text-gray-500">PDF Document</div>
              )}
              {file.endsWith('.txt') && (
                <div className="text-xs text-gray-500">Text File</div>
              )}
              {(file.endsWith('.doc') || file.endsWith('.docx')) && (
                <div className="text-xs text-gray-500">Word Document</div>
              )}
              {file.endsWith('.csv') && (
                <div className="text-xs text-gray-500">CSV Spreadsheet</div>
              )}
            </div>
            
            {selectedFile === file && (
              <div className="flex-shrink-0 flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full">
                <FiCheck className="text-indigo-600" size={12} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;