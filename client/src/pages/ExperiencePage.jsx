import React, { useEffect } from 'react';
import Experience from '../components/Experience/Experience';

const ExperiencePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Experience />;
};

export default ExperiencePage;
