
import { Product, ThemeCategory } from './types';

export const CATEGORIES: ThemeCategory[] = [
  'Memes', 'Movies & TV', 'Sports', 'Anime', 'Cars & Bikes', 'Games'
];

export const PRODUCTS: Product[] = [
  // Memes
  {
    id: 'meme-001',
    name: 'Distracted Boyfriend Tee',
    price: 899,
    description: 'The classic meme moment, now on premium cotton.',
    category: 'Memes',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'meme-002',
    name: 'This is Fine Dog Hoodie',
    price: 1299,
    description: 'When everything is on fire but you\'re chill.',
    category: 'Memes',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  // Movies & TV
  {
    id: 'movies-001',
    name: 'Breaking Bad Heisenberg Tee',
    price: 999,
    description: 'The one who knocks, now on your chest.',
    category: 'Movies & TV',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'movies-002',
    name: 'Stranger Things Upside Down',
    price: 1099,
    description: 'Welcome to the Upside Down collection.',
    category: 'Movies & TV',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  // Sports
  {
    id: 'sports-001',
    name: 'Messi GOAT Edition',
    price: 1199,
    description: 'For the greatest of all time fans.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'sports-002',
    name: 'El Clasico Rivalry Tee',
    price: 999,
    description: 'Madrid vs Barcelona, eternal rivalry.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  // Anime
  {
    id: 'anime-001',
    name: 'Naruto Shippuden Drop',
    price: 899,
    description: 'Believe it! Premium anime streetwear.',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'anime-002',
    name: 'One Piece Straw Hat',
    price: 1099,
    description: 'Join the crew on this epic adventure.',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  // Cars & Bikes
  {
    id: 'cars-001',
    name: 'Lamborghini Dreams Tee',
    price: 1299,
    description: 'Built for speed, designed for dreams.',
    category: 'Cars & Bikes',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'cars-002',
    name: 'Harley Davidson Rider',
    price: 1199,
    description: 'For those who live free on two wheels.',
    category: 'Cars & Bikes',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  // Games
  {
    id: 'games-001',
    name: 'Fortnite Victory Royale',
    price: 999,
    description: 'Drop in and level up your style.',
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  },
  {
    id: 'games-002',
    name: 'Minecraft Creeper Tee',
    price: 899,
    description: 'Beware the creeper, embrace the style.',
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White'],
    comingSoon: false
  }
];

export const THEME_INFO: Record<ThemeCategory, {
  emoji: string;
  tagline: string;
  description: string;
  color: string;
}> = {
  'Memes': {
    emoji: '😂',
    tagline: 'Wear the Internet',
    description: 'The most viral memes, now on premium cotton.',
    color: '#f59e0b'
  },
  'Movies & TV': {
    emoji: '🎬',
    tagline: 'Iconic Scenes. Wearable.',
    description: 'Your favourite frames, reimagined as streetwear.',
    color: '#8b5cf6'
  },
  'Sports': {
    emoji: '⚽',
    tagline: 'Represent Your Game',
    description: 'For the fans who live and breathe the game.',
    color: '#10b981'
  },
  'Anime': {
    emoji: '⛩️',
    tagline: 'Beyond the Screen',
    description: 'Premium anime-inspired drops for true fans.',
    color: '#ef4444'
  },
  'Cars & Bikes': {
    emoji: '🏎️',
    tagline: 'Built for Speed',
    description: 'For those who hear engines in their dreams.',
    color: '#3b82f6'
  },
  'Games': {
    emoji: '🎮',
    tagline: 'Player One Forever',
    description: 'Level up your wardrobe with gaming culture.',
    color: '#ec4899'
  }
};
