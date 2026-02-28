import { Media } from '@/types/media';

const textTemplates = [
  { content: 'The only way to do great work is to love what you do.', backgroundColor: 'bg-gradient-to-br from-purple-600 to-pink-600' },
  { content: 'Innovation distinguishes between a leader and a follower.', backgroundColor: 'bg-gradient-to-br from-blue-600 to-cyan-600' },
  { content: 'Life is what happens when you\'re busy making other plans.', backgroundColor: 'bg-gradient-to-br from-orange-600 to-red-600' },
  { content: 'The future belongs to those who believe in the beauty of their dreams.', backgroundColor: 'bg-gradient-to-br from-green-600 to-teal-600' },
  { content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600' }
];

const imageTemplates = [
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop', alt: 'Mountain landscape' },
  { url: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=1200&fit=crop', alt: 'Modern building' },
  { url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop', alt: 'Abstract art' },
  { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=1200&fit=crop', alt: 'Ocean waves' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=1200&fit=crop', alt: 'Starry night' }
];

const videoTemplates = [
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://images.unsplash.com/photo-1545274443-e3488c5b3d3a?w=800&h=1200&fit=crop', duration: 30 },
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=1200&fit=crop', duration: 45 },
  { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3a8039?w=800&h=1200&fit=crop', duration: 15 }
];

const gameTemplates = [
  { title: 'Click Master', description: 'Click the circle as fast as you can!' },
  { title: 'Bubble Pop', description: 'Pop the bubbles before they disappear!' },
  { title: 'Speed Tap', description: 'Tap the targets as quickly as possible!' }
];

export const generateMediaData = (count: number = 10): Media[] => {
  const media: Media[] = [];
  
  for (let i = 0; i < count; i++) {
    const typeIndex = i % 4;
    const templateIndex = Math.floor(i / 4) % 5;
    
    switch (typeIndex) {
      case 0: // Text
        const textTemplate = textTemplates[templateIndex % textTemplates.length];
        media.push({
          id: `text-${i}`,
          type: 'text',
          title: 'Inspiration',
          content: textTemplate.content,
          backgroundColor: textTemplate.backgroundColor,
          textColor: 'text-white'
        });
        break;
        
      case 1: // Image
        const imageTemplate = imageTemplates[templateIndex % imageTemplates.length];
        media.push({
          id: `image-${i}`,
          type: 'image',
          title: 'Nature',
          url: imageTemplate.url,
          alt: imageTemplate.alt,
          photographer: `Photographer ${templateIndex + 1}`
        });
        break;
        
      case 2: // Video
        const videoTemplate = videoTemplates[templateIndex % videoTemplates.length];
        media.push({
          id: `video-${i}`,
          type: 'video',
          title: 'Video Content',
          url: videoTemplate.url,
          thumbnail: videoTemplate.thumbnail,
          duration: videoTemplate.duration
        });
        break;
        
      case 3: // Game
        const gameTemplate = gameTemplates[templateIndex % gameTemplates.length];
        media.push({
          id: `game-${i}`,
          type: 'game',
          title: gameTemplate.title,
          description: gameTemplate.description,
          highScore: 0
        });
        break;
    }
  }
  
  return media;
};

export const initialMediaData = generateMediaData(10);

export const generateMediaActions = (mediaIds: string[], seed?: number) => {
  const actions: Record<string, { likes: number; shares: number }> = {};
  
  // Use a simple seeded random function for consistency
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  mediaIds.forEach((id, index) => {
    const seedValue = seed ? seed + index : index;
    actions[id] = {
      likes: Math.floor(seededRandom(seedValue) * 200) + 10,
      shares: Math.floor(seededRandom(seedValue + 1000) * 20) + 1
    };
  });
  
  return actions;
};

export const mediaActions = generateMediaActions(initialMediaData.map(m => m.id));
