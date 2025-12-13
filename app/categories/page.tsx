/**
 * Categories Page
 * Browse products by category
 */

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

const categories = [
  {
    name: 'Dresses',
    slug: 'dresses',
    description: 'Beautiful dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600',
    count: 12,
  },
  {
    name: 'T-Shirts',
    slug: 't-shirts',
    description: 'Comfortable and stylish t-shirts',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600',
    count: 15,
  },
  {
    name: 'Jeans',
    slug: 'jeans',
    description: 'Durable denim for active kids',
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600',
    count: 8,
  },
  {
    name: 'Jackets',
    slug: 'jackets',
    description: 'Warm and cozy outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    count: 6,
  },
  {
    name: 'Shorts',
    slug: 'shorts',
    description: 'Perfect for summer days',
    image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600',
    count: 10,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Hats, bags, and more',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600',
    count: 5,
  },
];

export default function CategoriesPage() {
  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of kids wear organized by category. Find
          exactly what you&apos;re looking for!
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group"
          >
            <div className="card p-0 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                  <p className="text-sm opacity-90 mb-3">{category.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{category.count} products</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
        <p className="text-gray-600 mb-6">
          Browse all our products or contact us for assistance
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/shop" className="btn-primary">
            View All Products
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}



