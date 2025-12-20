
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'f6-001',
    name: 'Stealth Black Oversized',
    price: 1299,
    description: 'Heavyweight cotton oversized fit T-shirt. Part of the Syndicate core collection. 280 GSM premium fabric.',
    category: 'Oversized',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black']
  },
  {
    id: 'f6-002',
    name: 'Neon Rebel Graphic',
    price: 999,
    description: 'Cyberpunk inspired graphic print on premium white cotton. High-density screen print.',
    category: 'Graphic',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['M', 'L', 'XL'],
    colors: ['White']
  },
  {
    id: 'f6-003',
    name: 'Syndicate Classic Tee',
    price: 799,
    description: 'The standard issue Syndicate tee. Minimalist logo on chest. 100% bio-washed cotton.',
    category: 'Classic',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Grey']
  },
  {
    id: 'f6-004',
    name: 'Crimson Fury Crew',
    price: 1149,
    description: 'Deep red dyed t-shirt with signature back print. Distressed finish.',
    category: 'Graphic',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['M', 'L', 'XL'],
    colors: ['Red']
  },
  {
    id: 'f6-005',
    name: 'Phantom Mesh Tech',
    price: 1499,
    description: 'Performance tech tee with moisture wicking fabric and Syndicate branding. Perfect for elite performance.',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L'],
    colors: ['Charcoal']
  },
  {
    id: 'f6-006',
    name: 'Abstract Flow Tee',
    price: 1099,
    description: 'Artistic abstract print across the shoulder and sleeve. Modern streetwear aesthetic.',
    category: 'Graphic',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&h=1000&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White']
  }
];

export const CATEGORIES = ['All', 'Oversized', 'Graphic', 'Classic', 'Performance'];
