'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GameMedia } from '@/types/media';

interface GameCardProps {
  media: GameMedia;
  isActive: boolean;
}

export function GameCard({ media, isActive }: GameCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(media.highScore);
  const [gameStarted, setGameStarted] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const bubblesRef = useRef<Array<{ x: number; y: number; radius: number; speed: number; color: string }>>([]);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize bubbles
    if (bubblesRef.current.length === 0) {
      for (let i = 0; i < 5; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 30 + Math.random() * 40,
          speed: 1 + Math.random() * 2,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update bubbles
      bubblesRef.current.forEach((bubble, index) => {
        // Move bubble up
        bubble.y -= bubble.speed;

        // Reset bubble if it goes off screen
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      if (gameStarted) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (gameStarted) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, gameStarted]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !gameStarted) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click hit any bubble
    bubblesRef.current.forEach((bubble) => {
      const distance = Math.sqrt((x - bubble.x) ** 2 + (y - bubble.y) ** 2);
      if (distance < bubble.radius) {
        // Bubble popped!
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) {
            setHighScore(newScore);
          }
          return newScore;
        });

        // Reset bubble position
        bubble.y = canvas.height + bubble.radius;
        bubble.x = Math.random() * canvas.width;
        bubble.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
      }
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
  };

  return (
    <motion.div
      className="h-screen w-full relative bg-gradient-to-br from-indigo-900 to-purple-900"
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
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />

      {/* Game UI */}
      <motion.div
        className="absolute top-0 left-0 right-0 p-8 text-white"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isActive ? 0 : -20, opacity: isActive ? 1 : 0.8 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{media.title}</h2>
            <p className="text-lg opacity-80">{media.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div className="text-lg opacity-80">High: {highScore}</div>
          </div>
        </div>
      </motion.div>

      {/* Start Game Button */}
      {!gameStarted && (
        <motion.button
          onClick={startGame}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          Start Game
        </motion.button>
      )}

      {/* Instructions */}
      {gameStarted && (
        <motion.div
          className="absolute bottom-8 left-8 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-lg opacity-80">Click the bubbles to pop them!</p>
        </motion.div>
      )}
    </motion.div>
  );
}
