import React, { createContext, useState, useEffect, useContext } from 'react';
import { IngestApi } from '../api/ingestApi';

// Create the context
export const FilesContext = createContext();

export const FilesProvider = ({ children }) => {
  // Files state
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  // Fetch files on mount
  useEffect(() => {
    fetchFiles();
  }, []);
  
  // Fetch ingested files from API
  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await IngestApi.listIngested();
      
      // Extract unique file names from the response
      const uniqueFiles = new Set();
      if (response && response.data) {
        response.data.forEach(doc => {
          if (doc.doc_metadata && doc.doc_metadata.file_name) {
            uniqueFiles.add(doc.doc_metadata.file_name);
          }
        });
      }
      
      setFiles(Array.from(uniqueFiles));
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err.message || 'Failed to fetch files');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Upload a file
  const uploadFile = async (file) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await IngestApi.ingestFile(file);
      
      // Refresh the file list
      await fetchFiles();
      
      return true;
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.message || 'Failed to upload file');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a file by name
  const deleteFile = async (fileName) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all documents
      const response = await IngestApi.listIngested();
      
      // Find all document IDs matching the file name
      const docsToDelete = response.data.filter(
        doc => doc.doc_metadata && doc.doc_metadata.file_name === fileName
      );
      
      // Delete each document
      for (const doc of docsToDelete) {
        await IngestApi.deleteDocument(doc.doc_id);
      }
      
      // Clear selected file if it was deleted
      if (selectedFile === fileName) {
        setSelectedFile(null);
      }
      
      // Refresh the file list
      await fetchFiles();
      
      return true;
    } catch (err) {
      console.error('Error deleting file:', err);
      setError(err.message || 'Failed to delete file');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete all files
  const deleteAllFiles = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all documents
      const response = await IngestApi.listIngested();
      
      // Delete each document
      for (const doc of response.data) {
        await IngestApi.deleteDocument(doc.doc_id);
      }
      
      // Clear selected file
      setSelectedFile(null);
      
      // Refresh the file list
      await fetchFiles();
      
      return true;
    } catch (err) {
      console.error('Error deleting all files:', err);
      setError(err.message || 'Failed to delete all files');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get context filter for selected file
  const getContextFilter = async () => {
    if (!selectedFile) return null;
    
    try {
      const response = await IngestApi.listIngested();
      
      // Find all document IDs matching the selected file name
      const docIds = response.data
        .filter(doc => doc.doc_metadata && doc.doc_metadata.file_name === selectedFile)
        .map(doc => doc.doc_id);
      
      return docIds.length > 0 ? { docs_ids: docIds } : null;
    } catch (err) {
      console.error('Error creating context filter:', err);
      return null;
    }
  };
  
  // Context value
  const value = {
    files,
    isLoading,
    error,
    selectedFile,
    setSelectedFile,
    fetchFiles,
    uploadFile,
    deleteFile,
    deleteAllFiles,
    getContextFilter,
  };
  
  return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>;
};

// Hook for using files context
export const useFiles = () => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error('useFiles must be used within a FilesProvider');
  }
  return context;
};