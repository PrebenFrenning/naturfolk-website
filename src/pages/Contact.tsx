
import React from 'react';
import Navbar from '../components/Navbar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import kontaktHero from '@/assets/kontakt-hero-new.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={kontaktHero} 
            alt="Par som holder hender foran norsk fjordlandskap med to ravner som flyr" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{t('contact.hero.title')}</h1>
        </div>
      </section>
      
      <div className="pb-0">
        <ContactSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Contact;
