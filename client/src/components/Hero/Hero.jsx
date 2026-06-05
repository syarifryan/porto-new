
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-background"></div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="hero-greeting"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            HELLO, I AM MUHAMMAD SYARIF JANURIANSYAH
          </motion.h2>

          <h1 className="hero-name glitch" data-text="RYAN">
            RYAN
          </h1>

          <motion.div
            className="hero-role-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="hero-role">WEB DEVELOPER</span>
            <span className="hero-divider"></span>
            <span className="hero-role">IoT ENTHUSIAST</span>
            <span className="hero-divider"></span>
            <span className="hero-role">AI / COMPUTER VISION</span>
          </motion.div>

          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }} 
          >
            Turning complex business challenges into scalable, production-ready solutions. 
            With expertise spanning from robust backend architectures and IoT systems to 
            AI-integrated applications, I am ready to accelerate your next big project. 
            Let's build something extraordinary together.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link to="/about" className="btn btn-outline hover-target">
              More About Me
            </Link>
            <a href="/contact" className="btn btn-primary hover-target">
              Contact Me
            </a>
            {/* <a href="/Resume.pdf" className="btn btn-outline hover-target" download>
              Download CV
            </a> */}
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link hover-target">
              <FiLinkedin size={20} />
            </a>
            <a href="mailto:hello@example.com" className="social-link hover-target">
              <FiMail size={20} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
