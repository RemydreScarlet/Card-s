'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { VideoMedia } from '@/types/media';
import { Play, Pause } from 'lucide-react';

interface VideoCardProps {
  media: VideoMedia;
  isActive: boolean;
}

export function VideoCard({ media, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && !isPlaying) {
      video.play().catch(console.error);
    } else if (!isActive && isPlaying) {
      video.pause();
    }
  }, [isActive]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <motion.div
      className="h-screen w-full relative bg-black"
      style={{
        scrollSnapAlign: 'start'
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95 
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={media.url}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        preload="metadata"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Play/Pause button - only show when paused or on hover */}
      <motion.button
        onClick={togglePlayPause}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: (isActive && !isPlaying) ? 1 : 0,
          scale: (isActive && !isPlaying) ? 1 : 0.8
        }}
        transition={{ delay: 0.3 }}
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white" />
        )}
      </motion.button>

      {/* Video info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{media.title}</h2>
        {media.duration && (
          <p className="text-lg opacity-80">{media.duration}s</p>
        )}
      </motion.div>

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white/50 text-lg">Loading video...</div>
        </div>
      )}
    </motion.div>
  );
}
