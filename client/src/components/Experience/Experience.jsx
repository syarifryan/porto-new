import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences, organizations } from '../../data/experience';
import './Experience.css';

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="experience-grid" ref={ref}>
          {/* Organizational Experience Column */}
          <div className="experience-column">
            <h3 className="column-title">Organizational Experience</h3>
            <div className="timeline">
              {organizations.map((org, index) => (
                <motion.div 
                  key={`org-${org.id}`} 
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content neo-card hover-target">
                    <div className="timeline-header">
                      <h3 className="timeline-position">{org.position}</h3>
                      <span className="timeline-period">{org.period}</span>
                    </div>
                    <h4 className="timeline-company">{org.company}</h4>
                    <p className="timeline-description">{org.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Work Experience Column */}
          <div className="experience-column">
            <h3 className="column-title">Work Experience</h3>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={`exp-${exp.id}`} 
                  className="timeline-item"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content neo-card hover-target">
                    <div className="timeline-header">
                      <h3 className="timeline-position">{exp.position}</h3>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                    <h4 className="timeline-company">{exp.company}</h4>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
