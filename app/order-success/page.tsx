/**
 * Order Success Page
 * Confirmation page after successful order
 */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <div className="absolute inset-0 animate-ping">
              <CheckCircle className="w-24 h-24 text-green-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped soon.
        </p>

        {/* Order Details */}
        {orderId && (
          <div className="card mb-8 text-left">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Order Details</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Order ID: <span className="font-mono">{orderId}</span>
                </p>
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to your registered email
                  address with order details.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders" className="btn-primary inline-flex items-center justify-center gap-2">
            View Order Details
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/shop" className="btn-secondary inline-flex items-center justify-center gap-2">
            Continue Shopping
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-primary-50 rounded-lg">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">1.</span>
              <span>Your order is being processed and prepared for shipment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">2.</span>
              <span>You&apos;ll receive tracking information via email once shipped</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">3.</span>
              <span>Expected delivery within 5-7 business days</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}




