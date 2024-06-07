import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-8">
      <h2 className="text-2xl mb-4">Follow us</h2>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
          <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
      <div className="text-sm mt-4 space-x-4">
        <a href="#contact" className="hover:underline">Contact</a>
        <span>|</span>
        <a href="#qui-sommes-nous" className="hover:underline">About us</a>
        <span>|</span>
        <a href="#mon-compte" className="hover:underline">My account</a>
        <span>|</span>
        <a href="#services" className="hover:underline">Wikiciné services</a>
      </div>
    </footer>
  );
};

export default Footer;
