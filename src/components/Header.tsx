import React, { useState } from 'react';

// Não é necessário adicionar tipos explícitos para componentes funcionais do React em TypeScript
// pois o TypeScript já inferirá a maior parte deles.
const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = (): void => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center p-4 mx-auto max-w-screen-xl">
      <div className="flex items-center">
        <a href="https://seu-link-para-o-CC50.com" target="_blank" rel="noopener noreferrer">
          <div className="font-bold text-lg md:text-3xl lg:text-4xl" style={{ marginTop: '10px', marginLeft: '35px' }}>
            CC50
          </div>
        </a>
      </div>
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="text-lg">
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute top-16 right-2 bg-white p-2 shadow-md z-10">
            <a href="https://seu-link-para-o-CC50.com" target="_blank" rel="noopener noreferrer">
              <p>Acessar o CC50</p>
            </a>
            <a href="https://seu-link-para-o-Discord.com" target="_blank" rel="noopener noreferrer">
              <p>Entrar no Discord</p>
            </a>
          </div>
        )}
      </div>
      <div className="hidden md:flex space-x-4">
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
