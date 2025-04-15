import React from 'react';

const Header = ({ children }) => {
  return (
    <header className="bg-white py-2 px-4 shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center">
            <img 
              src="/logo-tech.png" 
              alt="TechOfficeGPT Logo" 
              className="h-10 mr-3"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TechOffice GPT
              </h1>
              <p className="text-xs text-gray-500">Your AI Knowledge Assistant</p>
            </div>
          </div>
          
          {/* Navigation */}
          {children}
        </div>
        
        <div className="hidden md:flex items-center space-x-4 mt-3 md:mt-0">
          <a 
            href="https://techoffice.ca/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            About
          </a>
          <a 
            href="https://techoffice.ca/contact.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;