import api from './config';

export const ChatApi = {
  /**
   * Send a chat message to the API
   * @param {Array} messages - Array of message objects with role and content
   * @param {Boolean} useContext - Whether to use context from documents
   * @param {Object} contextFilter - Optional filter for context documents
   * @param {Boolean} includeSources - Whether to include sources in response
   * @param {Boolean} stream - Whether to stream the response
   * @returns {Promise} - Promise with response data
   */
  sendChatMessage: async (messages, useContext = false, contextFilter = null, includeSources = true, stream = false) => {
    // For streaming responses
    if (stream) {
      const response = await api.post('/chat/completions', {
        messages,
        use_context: useContext,
        context_filter: contextFilter,
        include_sources: includeSources,
        stream: true
      }, {
        responseType: 'stream'
      });
      return response;
    }

    // For regular responses
    const response = await api.post('/chat/completions', {
      messages,
      use_context: useContext,
      context_filter: contextFilter,
      include_sources: includeSources,
      stream: false
    });

    return response.data;
  },

  /**
   * Process an SSE (Server-Sent Events) stream for chat completions
   * @param {Response} response - Fetch API response object
   * @param {Function} onChunk - Callback for each chunk of data
   * @param {Function} onDone - Callback when stream is complete
   */
  processStream: async (response, onChunk, onDone) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        // Process buffer for SSE format: "data: {...}\n\n"
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') {
              if (onDone) onDone();
              return;
            }
            
            try {
              const data = JSON.parse(jsonStr);
              if (onChunk) onChunk(data);
            } catch (e) {
              console.error('Error parsing JSON from stream:', e);
            }
          }
        }
      }
      
      if (onDone) onDone();
    } catch (error) {
      console.error('Error reading stream:', error);
      throw error;
    }
  }
};