/**
 * About Page
 * Information about Pink Cherry brand
 */

import Image from 'next/image';
import { Heart, Award, Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-secondary-100 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Pink Cherry
            </h1>
            <p className="text-lg text-gray-600">
              Making childhood colorful, comfortable, and full of joy
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Pink Cherry was born from a simple belief: every child deserves
                  to wear clothes that are not just comfortable, but also make
                  them feel special. We started with a mission to provide
                  high-quality, affordable kids wear that combines style with
                  durability.
                </p>
                <p>
                  What began as a small dream has grown into a trusted brand
                  loved by parents and kids alike. We carefully curate every
                  piece in our collection, ensuring it meets our high standards
                  for quality, comfort, and style.
                </p>
                <p>
                  Today, Pink Cherry continues to bring joy to families across
                  the country, one outfit at a time. We&apos;re committed to making
                  shopping for kids wear a delightful experience for everyone.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800"
                alt="Happy kids"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality First</h3>
              <p className="text-sm text-gray-600">
                We never compromise on quality. Every product is carefully
                selected and tested.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Affordable Prices</h3>
              <p className="text-sm text-gray-600">
                Quality doesn&apos;t have to break the bank. We offer competitive
                prices for all families.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer Care</h3>
              <p className="text-sm text-gray-600">
                Your satisfaction is our priority. We&apos;re here to help whenever
                you need us.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Shopping</h3>
              <p className="text-sm text-gray-600">
                Simple, fast, and secure shopping experience from start to
                finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              To make quality kids wear accessible to every family, while
              ensuring that every child feels confident and happy in what they
              wear. We believe that great clothes should be affordable, durable,
              and most importantly, fun!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/shop" className="btn-primary">
                Start Shopping
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



