'use client';

import { useState } from 'react';
import { ReelContainer } from '@/components/reels/ReelContainer';
import { TextCard } from '@/components/reels/TextCard';
import { ImageCard } from '@/components/reels/ImageCard';
import { VideoCard } from '@/components/reels/VideoCard';
import { GameCard } from '@/components/reels/GameCard';
import { ActionButtons } from '@/components/ActionButtons';
import { initialMediaData, generateMediaData } from '@/lib/data';
import { Media } from '@/types/media';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [media, setMedia] = useState<Media[]>(initialMediaData);
  const [isLoaded, setIsLoaded] = useState(true);

  
  const loadMore = () => {
    const newMedia = generateMediaData(5);
    setMedia(prev => [...prev, ...newMedia]);
  };

  const renderMediaCard = (media: Media, index: number) => {
    const isActive = index === activeIndex;

    switch (media.type) {
      case 'text':
        return <TextCard key={media.id} media={media} isActive={isActive} />;
      case 'image':
        return <ImageCard key={media.id} media={media} isActive={isActive} />;
      case 'video':
        return <VideoCard key={media.id} media={media} isActive={isActive} />;
      case 'game':
        return <GameCard key={media.id} media={media} isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      {!isLoaded ? (
        <div className="h-full w-full flex items-center justify-center bg-black">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : (
        <ReelContainer 
          media={media} 
          onActiveChange={setActiveIndex}
          onLoadMore={loadMore}
        >
          {media.map((media: Media, index: number) => (
            <div key={media.id} className="relative">
              {renderMediaCard(media, index)}
              <ActionButtons mediaId={media.id} isActive={index === activeIndex} />
            </div>
          ))}
        </ReelContainer>
      )}
    </div>
  );
}
