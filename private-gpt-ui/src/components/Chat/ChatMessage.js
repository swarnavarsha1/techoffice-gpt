import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiUser, FiCopy, FiCheckCircle, FiCpu } from 'react-icons/fi';
import SourcesDisplay from '../Sources/SourcesDisplay';

const ChatMessage = ({ message }) => {
  const { role, content, sources } = message;
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Check if the content includes a sources separator
  const SOURCES_SEPARATOR = "<hr>Sources: \n";
  let messageContent = content;
  let sourcesSection = null;
  
  if (content.includes(SOURCES_SEPARATOR)) {
    const parts = content.split(SOURCES_SEPARATOR);
    messageContent = parts[0];
    sourcesSection = parts[1];
  }

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div 
        className={`relative max-w-3xl ${isUser ? 'mr-2' : 'ml-2'}`}
        style={{ width: 'calc(100% - 40px)' }}
      >
        <div 
          className={`rounded-lg shadow-sm overflow-hidden ${
            isUser 
              ? 'bg-indigo-100 text-gray-800 border border-indigo-200' 
              : 'bg-white border border-gray-200 text-gray-800'
          }`}
        >
          <div className={`px-4 py-2 flex items-center ${isUser ? 'border-b border-indigo-200' : 'border-b border-gray-200'}`}>
            <div 
              className={`flex items-center justify-center w-7 h-7 rounded-full mr-2 ${
                isUser ? 'bg-indigo-500' : 'bg-blue-100'
              }`}
            >
              {isUser ? (
                <FiUser className="text-white" size={14} />
              ) : (
                <FiCpu className="text-blue-600" size={14} />
              )}
            </div>
            <div className={`text-xs font-medium ${isUser ? 'text-indigo-700' : 'text-gray-600'}`}>
              {isUser ? 'You' : 'TechOffice GPT'}
            </div>
            {!isUser && (
              <button
                onClick={() => copyToClipboard(messageContent)}
                className={`ml-auto p-1 rounded-md ${
                  copied 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={copied ? 'Copied!' : 'Copy to clipboard'}
              >
                {copied ? <FiCheckCircle size={14} /> : <FiCopy size={14} />}
              </button>
            )}
          </div>
          
          <div className={`p-4 ${isUser ? '' : ''} prose prose-sm max-w-none break-words`}>
            {isUser ? (
              <div>{messageContent}</div>
            ) : (
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="bg-gray-800 text-gray-100 rounded-md my-2 p-2 overflow-x-auto">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, inline, ...props }) => 
                    inline ? (
                      <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
                    ) : (
                      <code {...props} />
                    ),
                  a: ({ node, children, ...props }) => (
                    <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props}>
                      {children}
                    </a>
                  )
                }}
              >
                {messageContent}
              </ReactMarkdown>
            )}
          </div>
        </div>
        
        {/* Show sources if available */}
        {sources && sources.length > 0 && (
          <SourcesDisplay sources={sources} />
        )}
        
        {/* Show sources section from content if available */}
        {sourcesSection && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs font-semibold text-gray-500 mb-1">SOURCES</div>
            <div className="text-sm text-gray-600">
              <ReactMarkdown>
                {sourcesSection}
              </ReactMarkdown>
            </div>
          </div>
        )}
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;