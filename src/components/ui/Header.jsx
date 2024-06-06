import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="text-xl font-bold text-gray-700">
        wikicine
      </div>
    </header>
  );
};

export default Header;