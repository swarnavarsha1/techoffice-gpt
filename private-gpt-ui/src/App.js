import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Chat from './components/Chat/Chat';
import Footer from './components/Layout/Footer';
import FileManagement from './components/FileManagement/FileManagement';
import Navigation from './components/Layout/Navigation';
import { ChatProvider } from './contexts/ChatContext';
import { FilesProvider } from './contexts/FilesContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('files'); // 'files' or 'chat'
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header with navigation */}
      <Header>
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Header>
      
      {/* Main content area */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full w-full max-w-7xl mx-auto px-2 sm:px-4 py-2">
          {/* The main content changes based on current page */}
          {currentPage === 'files' ? (
            <div className="h-full w-full">
              <FileManagement onComplete={() => setCurrentPage('chat')} />
            </div>
          ) : (
            <div className="h-full w-full">
              {/* Chat takes full width */}
              <Chat />
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <FilesProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </FilesProvider>
  );
}

export default App;