import React, { useRef, useState } from 'react';
import { FiUpload, FiFile, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { useFiles } from '../../contexts/FilesContext';

const FileUpload = () => {
  const { uploadFile, isLoading } = useFiles();
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploadStatus({ type: 'info', message: 'Uploading...' });

    try {
      for (let i = 0; i < files.length; i++) {
        await uploadFile(files[i]);
      }
      setUploadStatus({ type: 'success', message: 'Files uploaded successfully!' });
      
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear status after a delay
      setTimeout(() => setUploadStatus(null), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ type: 'error', message: 'Error uploading files' });
    }
  };

  const handleFileSelect = (event) => {
    handleUpload(event.target.files);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        accept=".pdf,.txt,.doc,.docx,.csv,.md,.html"
      />
      
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <div className={`p-3 rounded-full mb-2 ${
            dragActive ? 'bg-indigo-100' : 'bg-gray-100'
          }`}>
            <FiUpload className={`${
              dragActive ? 'text-indigo-600' : 'text-gray-500'
            }`} size={20} />
          </div>
          
          <p className="text-sm font-medium text-gray-700">
            {isLoading ? 'Uploading...' : 'Drop files here or click to upload'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports PDF, TXT, DOC, CSV, MD, HTML
          </p>
        </div>
      </div>

      {uploadStatus && (
        <div 
          className={`mt-2 p-2 text-sm rounded-md flex items-center ${
            uploadStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : uploadStatus.type === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}
        >
          {uploadStatus.type === 'success' && <FiCheck className="mr-2 flex-shrink-0" />}
          {uploadStatus.type === 'error' && <FiAlertCircle className="mr-2 flex-shrink-0" />}
          {uploadStatus.type === 'info' && <FiFile className="mr-2 flex-shrink-0" />}
          
          <span>{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;