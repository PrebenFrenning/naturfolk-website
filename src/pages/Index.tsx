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
import { PageSEO } from '@/components/PageSEO';

const Index = () => {
  return (
    <div className="min-h-screen">
      <PageSEO
        title="Naturfolk – urnordisk trossamfunn"
        description="Naturfolk er et trossamfunn basert på urnordisk, førkristen tro – hvor menneske, ånd og natur er ett. Bli med i fellesskapet."
        canonicalPath="/"
      />
      <Navbar />
      <Hero />
      <AboutSection />
      <VisionSection />
      <AktueltSection />
      {/* <TestimonialsSection /> */}
      <NewsletterSection />
      <ActivityCalendarSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
