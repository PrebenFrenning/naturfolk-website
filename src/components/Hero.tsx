import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-fjord-bonfire.png';

const Hero = () => {
  return (
    <div className="relative w-full h-screen min-h-[600px]">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Mektig nordnorsk fjordlandskap med fjell" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center items-center text-center -mt-24">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-4 animate-fade-in">
            Naturen er hellig
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl mx-auto animate-fade-in-delay font-serif">
            Et trossamfunn hvor menneske, ånd og natur er ett
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay justify-center" style={{ animationDelay: "0.4s" }}>
            <a href="/trosgrunnlag" className="btn-primary flex items-center gap-2">
              Vår tro og våre verdier
            </a>
            <a href="/medlemskap" className="btn-secondary text-white border-white hover:bg-white hover:text-nature-brown">
              Meld deg inn
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
