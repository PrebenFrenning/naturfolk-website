
import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  return (
    <div className="relative w-full h-screen min-h-[600px]">
      {/* Hero background - conditional based on state */}
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <VideoPlayer 
            videoSrc="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4"
            autoPlay={true}
            className="h-full"
          />
        ) : (
          <>
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" 
              alt="Nature landscape" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          </>
        )}
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-custom h-full flex flex-col justify-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-6 animate-fade-in">
          Vår natur er hellig
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl animate-fade-in-delay">
          Vi er et trossamfunn for dem som lever av, i og for naturen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay mb-8" style={{ animationDelay: "0.4s" }}>
            <a href="#about" className="btn-primary flex items-center gap-2">
              Les vår trosberetning <ArrowRight size={18} />
            </a>
            <a href="#programs" className="btn-secondary">
              Meld deg inn
            </a>
          </div>
          
          {/* Video toggle button */}
          <button 
            onClick={toggleVideo}
            className="flex items-center gap-2 text-white bg-nature-green/80 hover:bg-nature-green px-4 py-2 rounded-md transition-all"
          >
            {showVideo ? 'View Image' : 'Watch Video'} {showVideo ? null : <Play size={16} />}
          </button>
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
