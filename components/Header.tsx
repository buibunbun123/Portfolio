import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <section className="w-full h-20 relative bg-gradient-to-r from-blue-500 to-green-500">
      <div className="p-4 m-auto relative">
        <h1 className="absolute text-center p-2 font-bold font-mono text-2xl text-white">
          QR Code Generator
        </h1>
      </div>
    </section>
  );
};

export default Header;
