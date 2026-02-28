import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaLock, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [click, setClick] = useState(false);
    const location = useLocation();

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const isHomePage = location.pathname === '/';

    const NavLinks = () => (
        <>
            <li><ScrollLink to="home" smooth={true} duration={500} offset={-80} className="nav-link" onClick={closeMobileMenu}>Home</ScrollLink></li>
            <li><ScrollLink to="about" smooth={true} duration={500} offset={-80} className="nav-link" onClick={closeMobileMenu}>About</ScrollLink></li>
            <li><ScrollLink to="volunteer" smooth={true} duration={500} offset={-80} className="nav-link" onClick={closeMobileMenu}>Volunteer</ScrollLink></li>
            <li><ScrollLink to="feedback" smooth={true} duration={500} offset={-80} className="nav-link" onClick={closeMobileMenu}>Feedback</ScrollLink></li>
            <li><RouterLink to="/animals-for-adoption" className="nav-link" onClick={closeMobileMenu}>Adoption</RouterLink></li>
            <li><ScrollLink to="contact" smooth={true} duration={500} offset={-80} className="nav-link" onClick={closeMobileMenu}>Contact</ScrollLink></li>
        </>
    );
    
    // Links for non-home pages
    const OtherPageLinks = () => (
         <>
            <li><RouterLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</RouterLink></li>
            <li><RouterLink to="/animals-for-adoption" className="nav-link" onClick={closeMobileMenu}>Adoption</RouterLink></li>
         </>
    );

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <RouterLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    Rise for Tails
                </RouterLink>
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {isHomePage ? <NavLinks /> : <OtherPageLinks />}
                </ul>
                <div className="nav-icons">
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                    <RouterLink to="/admin" className="admin-button">
                        <FaLock />
                        <span className="admin-button-text">Admin</span>
                    </RouterLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;