import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLock, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ theme, setTheme }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    const closeMenu = () => setIsMenuOpen(false);

    const links =[
        { name: 'Home', path: '/' }, 
        { name: 'About', path: '/about' },
        { name: 'Team', path: '/team' }, 
        { name: 'Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' }, 
        { name: 'Service', path: '/service' },
        { name: 'Adoption', path: '/adoption' }, 
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-darkBg/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
            {/* Main Navbar Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                
                {/* Logo */}
                <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-primary tracking-wide z-50">
                    Rise for Tails
                </Link>

                {/* Desktop Menu (Hidden on screens smaller than 768px 'md') */}
                <ul className="hidden md:flex items-center space-x-6">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                className={`font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side Icons & Toggles */}
                <div className="flex items-center space-x-3 z-50">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme} 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'light' ? <FaMoon className="text-gray-800" size={18} /> : <FaSun className="text-yellow-400" size={18} />}
                    </button>

                    {/* Admin Button (Hidden on very small screens, visible on Desktop/Tablet) */}
                    <Link to="/admin" onClick={closeMenu} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                        <FaLock size={14} /> <span>Admin</span>
                    </Link>

                    {/* Hamburger Menu Toggle (Visible only on screens smaller than 768px 'md') */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div 
                className={`md:hidden absolute top-20 left-0 w-full bg-white dark:bg-darkBg border-b border-gray-200 dark:border-gray-800 shadow-lg transform transition-all duration-300 ease-in-out origin-top ${
                    isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
                }`}
            >
                <ul className="flex flex-col px-4 pt-2 pb-6 space-y-2">
                    {links.map(link => (
                        <li key={link.name}>
                            <Link 
                                to={link.path} 
                                onClick={closeMenu}
                                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                    location.pathname === link.path 
                                    ? 'text-primary bg-blue-50 dark:bg-gray-800/50' 
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    
                    {/* Admin Link specifically for Mobile View (Extra small screens where the top Admin button is hidden) */}
                    <li className="sm:hidden pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
                        <Link 
                            to="/admin" 
                            onClick={closeMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <FaLock size={18} /> Admin Panel
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;