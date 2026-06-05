import React, { useEffect } from 'react';
import TechStack from '../components/TechStack/TechStack';

const TechStackPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <TechStack />;
};

export default TechStackPage;
