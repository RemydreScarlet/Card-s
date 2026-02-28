export type MediaType = 'text' | 'image' | 'video' | 'game';

export interface BaseMedia {
  id: string;
  type: MediaType;
  title: string;
}

export interface TextMedia extends BaseMedia {
  type: 'text';
  content: string;
  backgroundColor: string;
  textColor: string;
}

export interface ImageMedia extends BaseMedia {
  type: 'image';
  url: string;
  alt: string;
  photographer?: string;
}

export interface VideoMedia extends BaseMedia {
  type: 'video';
  url: string;
  thumbnail: string;
  duration?: number;
}

export interface GameMedia extends BaseMedia {
  type: 'game';
  description: string;
  highScore: number;
}

export type Media = TextMedia | ImageMedia | VideoMedia | GameMedia;

export interface MediaActions {
  likes: number;
  comments: number;
  shares: number;
}
