import api from './config';

export const IngestApi = {
  /**
   * Ingest a file to the system
   * @param {File} file - File object to upload
   * @returns {Promise} - Promise with response data
   */
  ingestFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/ingest/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * List all ingested documents
   * @returns {Promise} - Promise with list of documents
   */
  listIngested: async () => {
    const response = await api.get('/ingest/list');
    return response.data;
  },

  /**
   * Delete an ingested document
   * @param {String} docId - Document ID to delete
   * @returns {Promise} - Promise with response data
   */
  deleteDocument: async (docId) => {
    const response = await api.delete(`/ingest/${docId}`);
    return response.data;
  },
  
  /**
   * Ingest text content
   * @param {String} fileName - Name to identify the text
   * @param {String} text - Text content to ingest
   * @returns {Promise} - Promise with response data
   */
  ingestText: async (fileName, text) => {
    const response = await api.post('/ingest/text', {
      file_name: fileName,
      text: text
    });
    
    return response.data;
  }
};