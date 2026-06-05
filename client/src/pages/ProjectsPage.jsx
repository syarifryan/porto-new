import React, { useEffect } from 'react';
import Projects from '../components/Projects/Projects';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Projects />;
};

export default ProjectsPage;
