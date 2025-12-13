/**
 * Products API Route
 * Fetches product data from Strapi CMS
 * For now, returns sample data until Strapi is configured
 */

import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/types';

// Sample product data (will be replaced with Strapi API call)
const sampleProducts: Product[] = [
  {
    id: '1',
    slug: 'cute-pink-dress',
    name: 'Cute Pink Dress',
    description: 'Adorable pink dress perfect for parties and special occasions. Made with soft, breathable fabric.',
    price: 1299,
    originalPrice: 1999,
    category: { id: 'cat1', name: 'Dresses', slug: 'dresses' },
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Pink', 'White'],
    inStock: true,
    featured: true,
    tags: ['new-arrival', 'party-wear'],
  },
  {
    id: '2',
    slug: 'boys-casual-tshirt',
    name: 'Boys Casual T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear. Available in multiple colors.',
    price: 499,
    originalPrice: 799,
    category: { id: 'cat2', name: 'T-Shirts', slug: 't-shirts' },
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    colors: ['Blue', 'Green', 'Yellow'],
    inStock: true,
    featured: false,
  },
  {
    id: '3',
    slug: 'floral-summer-dress',
    name: 'Floral Summer Dress',
    description: 'Light and breezy summer dress with beautiful floral prints. Perfect for hot days.',
    price: 899,
    originalPrice: 1499,
    category: { id: 'cat1', name: 'Dresses', slug: 'dresses' },
    images: [
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y'],
    colors: ['Multicolor'],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    slug: 'denim-jeans-kids',
    name: 'Kids Denim Jeans',
    description: 'Durable and stylish denim jeans for active kids. Comfortable fit with adjustable waist.',
    price: 1099,
    category: { id: 'cat3', name: 'Jeans', slug: 'jeans' },
    images: [
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y'],
    colors: ['Blue', 'Black'],
    inStock: true,
    featured: false,
  },
  {
    id: '5',
    slug: 'winter-jacket-kids',
    name: 'Warm Winter Jacket',
    description: 'Cozy winter jacket to keep your little one warm. Water-resistant and windproof.',
    price: 2499,
    originalPrice: 3499,
    category: { id: 'cat4', name: 'Jackets', slug: 'jackets' },
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'],
    colors: ['Red', 'Navy Blue', 'Black'],
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    slug: 'party-frock-pink',
    name: 'Princess Party Frock',
    description: 'Stunning party frock with sequins and layers. Makes your princess feel special.',
    price: 1899,
    originalPrice: 2999,
    category: { id: 'cat1', name: 'Dresses', slug: 'dresses' },
    images: [
      'https://images.unsplash.com/photo-1594223515816-5c5ca6b363ea?w=500',
    ],
    sizes: ['2-3Y', '3-4Y', '4-5Y'],
    colors: ['Pink', 'Purple'],
    inStock: true,
    featured: true,
  },
];

/**
 * GET /api/products
 * Query params: category, featured, limit
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    // Filter products based on query params
    let filteredProducts = [...sampleProducts];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.slug === category
      );
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter((p) => p.featured === true);
    }

    if (limit) {
      filteredProducts = filteredProducts.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
    });
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * In production, replace above with Strapi API call:
 * 
 * const response = await fetch(`${process.env.STRAPI_URL}/api/products?populate=*`, {
 *   headers: {
 *     Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
 *   },
 * });
 * const data = await response.json();
 */




