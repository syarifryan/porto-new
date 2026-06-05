
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-text">MSJ</span>
            <span className="logo-dot">.</span>
            <p className="footer-tagline">Innovate. Build. Deliver.</p>
          </div>

          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FiGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FiLinkedin size={24} />
            </a>
            <a href="mailto:hello@example.com" className="social-link hover-target">
              <FiMail size={24} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MSJ-Createch. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about" className="hover-target">About</Link>
            <Link to="/projects" className="hover-target">Projects</Link>
            <Link to="/contact" className="hover-target">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
