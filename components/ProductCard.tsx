/**
 * ProductCard Component
 * Displays individual product with image, price, and quick actions
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store/cartStore';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add with default size and color
    addItem(product, 1, product.sizes[0], product.colors[0]);
    // Could show a toast notification here
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="card p-0 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={imageError ? '/placeholder-product.jpg' : product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                Featured
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button (Mobile Always Visible) */}
          <div className="absolute bottom-2 left-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full btn-primary flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          <div className="flex gap-1 mt-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs border border-gray-300 px-2 py-1 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{product.sizes.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}




