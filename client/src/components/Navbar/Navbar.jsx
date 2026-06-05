import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Tech Stack', href: '/tech' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certificates', href: '/certificates' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Use both window.scrollY and documentElement.scrollTop for compatibility
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollPos > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo hover-target">
          <span className="logo-text">MSJ</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="nav-links desktop-nav">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink 
                to={link.href} 
                className={({ isActive }) => isActive ? "nav-link active hover-target" : "nav-link hover-target"}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle-btn hover-target" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button className="mobile-toggle hover-target" onClick={toggleMenu}>
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <ul className="mobile-nav-links">
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink 
                    to={link.href} 
                    className={({ isActive }) => isActive ? "mobile-nav-link active hover-target" : "mobile-nav-link hover-target"} 
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
              >
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '20px' }}>
                  <button className="theme-toggle-btn hover-target" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {theme === 'dark' ? <FiSun size={24} /> : <FiMoon size={24} />}
                  </button>
                  {/* <a href="/Resume.pdf" className="btn btn-primary">
                    Resume
                  </a> */}
                </div>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
