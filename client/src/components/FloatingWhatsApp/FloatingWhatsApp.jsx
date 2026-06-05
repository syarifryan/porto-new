import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import './FloatingWhatsApp.css';

const PHONE_NUMBER = '6281916393161'; // Update with your WhatsApp number
const DEFAULT_MESSAGE = 'Halo Ryan! Saya tertarik untuk berdiskusi tentang project.';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [showPulse, setShowPulse] = useState(true);

  // Show a notification dot for the first 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="floating-wa">
      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="wa-popup"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="wa-popup-header">
              <div className="wa-header-info">
                <div className="wa-avatar">
                  <span>R</span>
                  <span className="wa-online-dot" />
                </div>
                <div className="wa-header-text">
                  <span className="wa-header-name">Ryan</span>
                  <span className="wa-header-status">Typically replies instantly</span>
                </div>
              </div>
              <button className="wa-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="wa-popup-body">
              <div className="wa-chat-bubble">
                <p>Hey there! 👋</p>
                <p>Ada yang bisa saya bantu? Silakan kirim pesan.</p>
                <span className="wa-bubble-time">Just now</span>
              </div>
            </div>

            {/* Input */}
            <div className="wa-popup-input">
              <textarea
                className="wa-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={2}
              />
              <button className="wa-send-btn" onClick={handleSend} aria-label="Send message">
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        className={`wa-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse rings */}
        {showPulse && !isOpen && (
          <>
            <span className="wa-fab-ring wa-fab-ring-1" />
            <span className="wa-fab-ring wa-fab-ring-2" />
          </>
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="wa-fab-icon"
            >
              <FiX size={26} />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="wa-fab-icon"
            >
              <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.342 22.622c-.39 1.1-1.932 2.014-3.16 2.28-.84.18-1.936.324-5.628-1.21-4.722-1.962-7.76-6.748-7.998-7.062-.228-.314-1.916-2.55-1.916-4.864 0-2.314 1.212-3.45 1.642-3.924.39-.432.912-.586 1.196-.586.148 0 .28.008.4.014.432.018.648.044.934.724.358.85 1.226 2.996 1.334 3.214.11.218.218.512.072.814-.138.308-.262.498-.48.764-.218.268-.428.472-.646.762-.2.254-.424.524-.176.956.248.432 1.104 1.818 2.372 2.948 1.632 1.454 3.006 1.906 3.432 2.116.318.158.698.128.956-.148.326-.352.728-.936 1.138-1.512.292-.412.662-.462 1.012-.314.356.142 2.248 1.06 2.632 1.254.384.192.64.29.734.448.092.158.092.908-.298 2.006z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingWhatsApp;
