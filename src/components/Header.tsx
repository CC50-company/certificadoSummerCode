import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <a href="https://seu-link-para-o-CC50.com" target="_blank" rel="noopener noreferrer">
          <div className="font-bold text-lg md:text-3xl lg:text-4xl xl:text-20xl" style={{ marginTop: '10px', marginLeft: '35px' }}>
            CC50
          </div>
        </a>
      </div>
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="text-lg">
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute top-16 right-2 bg-white p-2">
            <a href="https://seu-link-para-o-CC50.com" target="_blank" rel="noopener noreferrer">
              <p>Acessar o CC50</p>
            </a>
            <a href="https://seu-link-para-o-Discord.com" target="_blank" rel="noopener noreferrer">
              <p>Entrar no Discord</p>
            </a>
          </div>
        )}
      </div>
      <div className="hidden md:flex space-x-4 absolute top-3 right-10">
        <a href="https://seu-link-para-o-CC50.com" target="_blank" rel="noopener noreferrer">
          <p>Acessar o CC50</p>
        </a>
        <a href="https://seu-link-para-o-Discord.com" target="_blank" rel="noopener noreferrer">
          <p>Entrar no Discord</p>
        </a>
      </div>
    </header>
  );
};

export { Header };
