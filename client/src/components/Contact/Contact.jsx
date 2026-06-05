import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiSend } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengirim pesan. Silakan coba lagi.');
      }

      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Terjadi kesalahan. Silakan coba lagi.',
      });

      // Reset error message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, error: null }));
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="contact-content" ref={ref}>
          <motion.div
            className="contact-info neo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Let's Connect</h3>
            <p className="contact-description">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMail size={24} />
                </div>
                <div className="contact-text">
                  <span>Email</span>
                  <a href="mailto:[EMAIL_ADDRESS]" className="hover-target">msyarifjanuriansyah@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <FiMapPin size={24} />
                </div>
                <div className="contact-text">
                  <span>Location</span>
                  <p>Surabaya, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <span>Follow me:</span>
              <div className="social-links">
                <a href="https://github.com/syarifryan" target="_blank" rel="noreferrer" className="social-link hover-target">
                  <FiGithub size={20} />
                </a>
                <a href="https://linkedin.com/in/msyarifjanuriansyah" target="_blank" rel="noreferrer" className="social-link hover-target">
                  <FiLinkedin size={20} />
                </a>
                <a href="https://instagram.com/syarif.ryan" target="_blank" rel="noreferrer" className="social-link hover-target">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container neo-card"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control hover-target"
                  placeholder="Ryan"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control hover-target"
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-control hover-target"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit-btn hover-target"
                disabled={status.submitting}
              >
                {status.submitting ? 'Sending...' : (
                  <>Send Message <FiSend size={18} style={{ marginLeft: '8px' }} /></>
                )}
              </button>

              {status.success && (
                <div className="toast success-toast">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {status.error && (
                <div className="toast error-toast">
                  {status.error}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
