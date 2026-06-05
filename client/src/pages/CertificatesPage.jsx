import React, { useEffect } from 'react';
import Certificates from '../components/Certificates/Certificates';

const CertificatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Certificates />;
};

export default CertificatesPage;
