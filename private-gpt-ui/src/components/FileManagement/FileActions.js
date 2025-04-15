import React, { useState } from 'react';
import { useFiles } from '../../contexts/FilesContext';
import { FiTrash2, FiX, FiAlertTriangle, FiCheck } from 'react-icons/fi';

const FileActions = () => {
  const { selectedFile, setSelectedFile, deleteFile, deleteAllFiles, isLoading, files } = useFiles();
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(null);

  const handleDeselectFile = () => {
    setSelectedFile(null);
  };

  const handleDeleteSelected = async () => {
    if (selectedFile && !isLoading) {
      setDeleteStatus('loading');
      try {
        await deleteFile(selectedFile);
        setDeleteStatus('success');
        setTimeout(() => setDeleteStatus(null), 2000);
      } catch (error) {
        setDeleteStatus('error');
        setTimeout(() => setDeleteStatus(null), 3000);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!isLoading) {
      setDeleteStatus('loading');
      try {
        await deleteAllFiles();
        setShowDeleteAllConfirm(false);
        setDeleteStatus('success');
        setTimeout(() => setDeleteStatus(null), 2000);
      } catch (error) {
        setDeleteStatus('error');
        setTimeout(() => setDeleteStatus(null), 3000);
      }
    }
  };

  return (
    <div className="space-y-3 mt-3">
      {selectedFile && (
        <div className="space-y-2">
          <div className="flex items-center p-2 bg-indigo-50 rounded-md border border-indigo-100">
            <span className="flex-grow truncate text-sm text-indigo-700 font-medium">{selectedFile}</span>
            <button
              onClick={handleDeselectFile}
              className="p-1 text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors"
              title="Deselect file"
              disabled={isLoading}
            >
              <FiX size={16} />
            </button>
          </div>
          
          <button
            onClick={handleDeleteSelected}
            className={`w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors shadow-sm ${
              deleteStatus === 'loading' 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            disabled={isLoading || deleteStatus === 'loading'}
          >
            {deleteStatus === 'loading' ? (
              <>Loading...</>
            ) : (
              <>
                <FiTrash2 className="mr-1.5" size={16} />
                Delete Selected File
              </>
            )}
          </button>
        </div>
      )}

      {!showDeleteAllConfirm ? (
        <button
          onClick={() => setShowDeleteAllConfirm(true)}
          className={`w-full flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors shadow-sm ${
            isLoading || files?.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-700 text-white hover:bg-gray-800'
          }`}
          disabled={isLoading || files?.length === 0}
        >
          <FiTrash2 className="mr-1.5" size={16} />
          Delete ALL Files
        </button>
      ) : (
        <div className="border border-red-200 rounded-md p-3 bg-red-50">
          <div className="flex items-center mb-2 text-red-700">
            <FiAlertTriangle className="mr-1.5 flex-shrink-0" size={16} />
            <p className="text-sm font-medium">Confirm Deletion</p>
          </div>
          <p className="text-xs text-red-600 mb-3">
            Are you sure you want to delete all files? This action cannot be undone.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDeleteAll}
              className={`flex-1 px-3 py-2 text-xs font-medium text-white rounded-md transition-colors shadow-sm ${
                deleteStatus === 'loading' 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
              disabled={isLoading || deleteStatus === 'loading'}
            >
              {deleteStatus === 'loading' ? 'Deleting...' : 'Yes, Delete All'}
            </button>
            <button
              onClick={() => setShowDeleteAllConfirm(false)}
              className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading || deleteStatus === 'loading'}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {deleteStatus === 'success' && (
        <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 flex items-center">
          <FiCheck className="mr-1.5" size={16} />
          File(s) deleted successfully
        </div>
      )}

      {deleteStatus === 'error' && (
        <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 flex items-center">
          <FiAlertTriangle className="mr-1.5" size={16} />
          Error deleting file(s)
        </div>
      )}
    </div>
  );
};

export default FileActions;