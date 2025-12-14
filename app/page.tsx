/**
 * Home Page
 * Landing page with hero section, featured products, and categories
 */

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

// Fetch products on the server
import { getProducts } from '@/lib/data/products';

// Fetch products directly on the server
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    return await getProducts({ featured: true, limit: 6 });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-100 py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Dress Your Little Ones in
                <span className="text-primary"> Style & Comfort</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover our collection of high-quality kids wear designed for
                comfort, style, and endless fun. From everyday essentials to
                party outfits.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary">
                  <ShoppingBag className="w-5 h-5 inline mr-2" />
                  Shop Now
                </Link>
                <Link href="/categories" className="btn-secondary">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800"
                alt="Happy kids in colorful outfits"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹999</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated customer service</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">7-day return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dresses', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400', slug: 'dresses' },
              { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400', slug: 't-shirts' },
              { name: 'Jeans', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400', slug: 'jeans' },
              { name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400', slug: 'jackets' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/shop" className="text-primary hover:underline font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1"
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}




