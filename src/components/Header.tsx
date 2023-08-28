
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <header className="flex justify-between items-center p-4"> {/* fiz esse header pq o outra era feio haha*/}
      <div className="flex items-center">
        <div className="font-bold text-lg md:text-3xl lg:text-4xl xl:text-20xl" style={{ marginTop: '10px', marginLeft: '35px' }}>
          CC50
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={toggleDropdown} className="text-lg">
          Menu
        </button>
        {isDropdownOpen && (
          <div className="absolute top-16 right-2 bg-white p-2">
            <p>Acessar o CC50</p>
            <p>Entrar no Discord</p>
          </div>
        )}
      </div>
      <div className="hidden md:flex space-x-4 absolute top-3 right-10">
        <p>Acessar o CC50</p>
        <p>Entrar no Discord</p>
      </div>
    </header>
  );
};


export { Header };
