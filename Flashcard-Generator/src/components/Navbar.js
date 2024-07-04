import React from "react";
import AlmaBetterLogo from '../assets/logo.png'


const Navbar = () => {
  return (
    
      <div className="flex items-center justify-between bg-white p-2 shadow-lg">
        <img
          src={AlmaBetterLogo}
          alt="AlmaBetter logo"
          className="w-18 h-5 sm:w-22 sm:h-6 sm:ml-3 "
        />
      </div>
      
    
  );
};

export default Navbar;
