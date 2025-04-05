import React, { useState } from 'react';

const AnimatedHamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="relative">
            <button 
                className="flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none bg-gray-100 p-2"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label="Main menu"
            >
                <span 
                    className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-out ${
                        isOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                />
                <span 
                    className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ease-out ${
                        isOpen ? 'opacity-0' : ''
                    }`}
                />
                <span 
                    className={`block w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ease-out ${
                        isOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                />
            </button>
            
            {isOpen && (
                <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Home</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">About</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Services</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Contact</a>
                </div>
            )}
        </div>
    );
};

export default function Project2() {
    return (
        <div className="max-w-7xl mx-auto p-4 pt-6">
            <div className="flex justify-between items-center">
                <AnimatedHamburgerMenu />
            </div>
        </div>
    );
}
