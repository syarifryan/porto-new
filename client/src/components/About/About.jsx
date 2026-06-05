import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';

const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);

      // Easing function for smooth stop
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animateCount);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <motion.div
          className="about-content"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="about-top-row">
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                Hello! I'm Muhammad Syarif Januriansyah, but you can call me Ryan. I am a programmer with a deep passion for exploring the intersection of modern technologies.
              </p>
              <p>
                My main focus right now is on <strong>Web Development</strong>, integrating hardware systems through the <strong>Internet of Things (IoT)</strong>, and building artificial intelligence driven by <strong>Computer Vision</strong>. I am highly enthusiastic about creating end-to-end solutions that bridge the digital and physical worlds.
              </p>
              <p>
                With this multi-disciplinary background, I am accustomed to solving complex problems—from training machine learning models for object detection and connecting sensors to the cloud, to designing interactive web interfaces for real-time data visualization.
              </p>
            </motion.div>

            <motion.div className="about-image-wrapper" variants={itemVariants}>
              <div className="about-image-container hover-target">
                <div className="image-overlay"></div>
                {/* Replace placeholder with an actual image in production */}
                <img src="/photo/IMG_2533.JPEG.jpg" alt="Ryan" className="about-img" />
                <div className="image-frame"></div>
              </div>
            </motion.div>
          </div>

          <div className="about-bottom-row">
            <motion.div className="about-education" variants={itemVariants}>
              <h3 className="section-subtitle">Education</h3>
              <div className="education-list">
                <div className="education-item hover-target">
                  <div className="education-meta">
                    <h4>Master's Degree - Information Systems</h4>
                    <span className="education-gpa">GPA 3.76</span>
                  </div>
                  <p className="education-school">Institut Teknologi Sepuluh Nopember</p>
                </div>
                <div className="education-item hover-target">
                  <div className="education-meta">
                    <h4>Applied Bachelor's (D4) - Informatics Engineering</h4>
                    <span className="education-gpa">GPA 3.86</span>
                  </div>
                  <p className="education-school">Politeknik Negeri Jember</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="about-stats-container" variants={itemVariants}>
              <h3 className="section-subtitle">Highlights</h3>
              <div className="about-stats">
                <div className="stat-item">
                  <h3 className="stat-number">
                    <AnimatedCounter end={5} suffix="+" />
                  </h3>
                  <p className="stat-label">Years Experience</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">
                    <AnimatedCounter end={34} suffix="+" />
                  </h3>
                  <p className="stat-label">Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3 className="stat-number">
                    <AnimatedCounter end={18} />
                  </h3>
                  <p className="stat-label">Core Technologies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
