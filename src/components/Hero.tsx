
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px]">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" 
          alt="Nature landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-6 animate-fade-in">
            Connecting People with Nature for a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl animate-fade-in-delay">
            At Naturfolk, we inspire environmental stewardship through education, conservation, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay" style={{ animationDelay: "0.4s" }}>
            <a href="#about" className="btn-primary flex items-center gap-2">
              Discover Our Mission <ArrowRight size={18} />
            </a>
            <a href="#programs" className="btn-secondary">
              Explore Programs
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
