import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiX, FiExternalLink } from 'react-icons/fi';
import { certificates } from '../../data/certificates';
import './Certificates.css';

const CertModal = ({ cert, onClose }) => {
  if (!cert) return null;

  return (
    <motion.div 
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="cert-modal-content neo-card"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close hover-target" onClick={onClose}>
          <FiX size={24} />
        </button>

        <div className="cert-modal-image-wrapper">
          <img src={cert.image} alt={cert.title} className="cert-modal-image" />
        </div>

        <div className="cert-modal-details">
          <h3>{cert.title}</h3>
          <p className="cert-issuer">{cert.issuer} • {cert.year}</p>
          <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="btn btn-outline hover-target" style={{ marginTop: '1rem', width: '100%' }}>
            <FiExternalLink size={18} style={{ marginRight: '8px' }} /> Verify Credential
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certificates" className="section cert-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Certificates
        </motion.h2>

        <div className="cert-grid" ref={ref}>
          {certificates.map((cert, index) => (
            <motion.div 
              key={cert.id}
              className="cert-card hover-target neo-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-image-container">
                <div className="cert-image-overlay">
                  <span>Click to zoom</span>
                </div>
                <img src={cert.image} alt={cert.title} className="cert-image" loading="lazy" />
              </div>
              <div className="cert-info">
                <h3 className="cert-title">{cert.title}</h3>
                <div className="cert-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-year">{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertModal 
            cert={selectedCert} 
            onClose={() => setSelectedCert(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
