/**
 * Products API Route
 * Fetches product data from Strapi CMS
 * For now, returns sample data until Strapi is configured
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/data/products';

/**
 * GET /api/products
 * Query params: category, featured, limit
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const products = await getProducts({ category, featured, limit });

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
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




