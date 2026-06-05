import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import CustomCursor from '../CustomCursor/CustomCursor';
import GrainOverlay from '../GrainOverlay/GrainOverlay';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';
import FloatingWhatsApp from '../FloatingWhatsApp/FloatingWhatsApp';

const Layout = ({ children }) => {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      
      <main className="main-content">
        {children}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
