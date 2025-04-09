
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import EventsSection from '../components/EventsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import VideoPlayer from '../components/VideoPlayer';
import ScrollToTop from '../components/ScrollToTop';
import NewsletterSection from '../components/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      
      {/* Newsletter Section - Positioned high on the page */}
      <NewsletterSection />
      
      {/* Featured Video Section */}
      <section className="py-16 bg-nature-offwhite">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Vår natur er hellig</h2>
            <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
            <p className="text-lg">
            Vi er et trossamfunn for dem som lever av, i og for naturen.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <VideoPlayer 
              videoSrc="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-pine-forest-48213-large.mp4"
              title="Wilderness Immersion"
              description="Our programs create space for meaningful connection with wild places and authentic relationships with yourself and others."
              posterSrc="https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <EventsSection />
      <TestimonialsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
