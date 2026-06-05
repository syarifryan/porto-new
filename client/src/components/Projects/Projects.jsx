import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import { projects } from '../../data/projects';
import './Projects.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content neo-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close hover-target" onClick={onClose}>
          <FiX size={24} />
        </button>

        <div className="modal-image-container">
          <div className="modal-image-overlay"></div>
          <img src={project.image} alt={project.title} className="modal-image" />
        </div>

        <div className="modal-body">
          <h3 className="modal-title">{project.title}</h3>

          <div className="modal-tech-stack">
            {project.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-actions">
            {project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary hover-target">
                <FiExternalLink size={18} style={{ marginRight: '8px' }} /> Live Demo
              </a>
            )}
            {project.repoUrl !== '#' && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn-outline hover-target">
                <FiGithub size={18} style={{ marginRight: '8px' }} /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['All', 'Web', 'IoT', 'AI'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          Selected Works
        </motion.h2>

        <div className="projects-content" ref={ref}>
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

          <motion.div className="projects-grid" layout>
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card neo-card hover-target"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="project-image-container">
                    <div className="project-image-overlay"></div>
                    <img src={project.image} alt={project.title} className="project-image" />
                    <div className="project-category">{project.category}</div>
                  </div>

                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tech-preview">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-dot" title={tech}></span>
                      ))}
                      {project.techStack.length > 3 && <span className="tech-more">+{project.techStack.length - 3}</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
