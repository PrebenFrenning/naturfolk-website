
import React from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-0">
        <ContactSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
