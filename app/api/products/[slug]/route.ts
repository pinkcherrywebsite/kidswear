/**
 * Single Product API Route
 * Fetches individual product by slug
 */

import { NextRequest, NextResponse } from 'next/server';

// Import sample data from main products route
// In production, this would fetch from Strapi
const sampleProducts = [
  {
    id: '1',
    slug: 'cute-pink-dress',
    name: 'Cute Pink Dress',
    description: 'Adorable pink dress perfect for parties and special occasions. Made with soft, breathable fabric that ensures comfort throughout the day.',
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
  },
  // Add more products as needed
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find product by slug
    const product = sampleProducts.find((p) => p.slug === slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}




