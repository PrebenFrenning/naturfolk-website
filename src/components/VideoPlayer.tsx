
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  description?: string;
  className?: string;
  autoPlay?: boolean;
  showControls?: boolean;
}

const VideoPlayer = ({
  videoSrc,
  posterSrc,
  title,
  description,
  className = '',
  autoPlay = false,
  showControls = true,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-semibold">{title}</h3>
          {description && <p className="mt-2 text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="relative aspect-video">
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          poster={posterSrc}
          autoPlay={autoPlay}
          loop
          muted
          playsInline
          ref={(el) => {
            if (el) {
              isPlaying ? el.play() : el.pause();
            }
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {showControls && (
          <button
            onClick={togglePlayback}
            className="absolute bottom-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
