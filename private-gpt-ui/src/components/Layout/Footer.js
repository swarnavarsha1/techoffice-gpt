import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-2 px-4 border-t border-indigo-100">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-1 md:mb-0">
          <span className="text-xs text-gray-600">Powered by</span>
          <a 
            href="https://ameyacloud.in/" 
            className="flex items-center ml-2 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span></span>
            <img 
              src="/logo-ameya.png" 
              alt="Ameya" 
              className="h-4 ml-1 rounded-full"
            />
          </a>
        </div>
        
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Ameya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;