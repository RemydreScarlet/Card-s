'use client';

import { motion } from 'framer-motion';
import { TextMedia } from '@/types/media';

interface TextCardProps {
  media: TextMedia;
  isActive: boolean;
}

export function TextCard({ media, isActive }: TextCardProps) {
  return (
    <motion.div
      className={`h-screen w-full flex items-center justify-center ${media.backgroundColor} ${media.textColor}`}
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
      <div className="text-center px-8 max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {media.title}
        </motion.h1>
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: isActive ? 0 : 15, opacity: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {media.content}
        </motion.p>
      </div>
    </motion.div>
  );
}
