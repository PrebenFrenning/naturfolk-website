import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import NewsletterSection from '../components/NewsletterSection';
import VisionSection from '../components/VisionSection';
import AktueltSection from '../components/AktueltSection';
import ActivityCalendarSection from '../components/ActivityCalendarSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TestimonialsSection />
      <AboutSection />
      <NewsletterSection />
      <VisionSection />
      <AktueltSection />
      <ActivityCalendarSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
