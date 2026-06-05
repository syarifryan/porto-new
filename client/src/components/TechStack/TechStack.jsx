import { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../../data/skills';
import './TechStack.css';

const TechStack = () => {
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['All', 'Frontend', 'Backend', 'Tools'];

  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section id="tech" className="section tech-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>

        <div className="tech-content" ref={ref}>
          <motion.div 
            className="filter-container"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((cat, index) => (
              <button 
                key={index}
                className={`filter-btn hover-target ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div 
            className="skills-grid"
            layout
          >
            <AnimatePresence>
              {filteredSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="skill-card neo-card hover-target"
                  >
                    <div className="skill-icon">
                      <IconComponent size={40} />
                    </div>
                    <div className="skill-info">
                      <h3 className="skill-name">{skill.name}</h3>
                      <div className="progress-bg">
                        <motion.div 
                          className="progress-bar"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
