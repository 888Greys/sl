import React from 'react';

const Navbar = () => {
  return (
    <header style={{ backgroundColor: 'var(--primary)' }} className="h-[60px] flex justify-between items-center px-5 shadow-md">
      <div className="text-white text-2xl font-bold tracking-tighter">
        Max<span className="text-black">It</span>
      </div>
      <button className="flex flex-col gap-[5px] p-[5px] cursor-pointer bg-transparent border-none" aria-label="Menu">
        <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
        <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
        <span className="block w-[25px] h-[3px] bg-white rounded-full"></span>
      </button>
    </header>
  );
};

export default Navbar;
