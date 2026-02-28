'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageMedia } from '@/types/media';

interface ImageCardProps {
  media: ImageMedia;
  isActive: boolean;
}

export function ImageCard({ media, isActive }: ImageCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={media.url}
          alt={media.alt}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Image info */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{media.title}</h2>
        {media.photographer && (
          <p className="text-lg opacity-80">Photo by {media.photographer}</p>
        )}
      </motion.div>

      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white/50 text-lg">Loading image...</div>
        </div>
      )}
    </motion.div>
  );
}
