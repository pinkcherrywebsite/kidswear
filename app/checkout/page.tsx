/**
 * Checkout Page
 * Order checkout with shipping information and payment
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';
import { Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: session?.user?.email || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Redirect if cart is empty
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  // Redirect to login if not authenticated
  if (!session) {
    router.push('/login?redirect=/checkout');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            image: item.product.images[0],
          })),
          totalAmount: getTotalPrice(),
          shippingAddress: formData,
          paymentMethod: 'razorpay',
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error('Failed to create order');
      }

      // Step 2: Create Razorpay order
      const paymentResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getTotalPrice(),
        }),
      });

      const paymentData = await paymentResponse.json();

      if (!paymentData.success) {
        throw new Error('Failed to create payment order');
      }

      // Step 3: Open Razorpay checkout
      const options = {
        key: paymentData.data.keyId,
        amount: paymentData.data.amount,
        currency: paymentData.data.currency,
        name: 'Pink Cherry',
        description: 'Kids Wear Purchase',
        order_id: paymentData.data.orderId,
        handler: async function (response: any) {
          // Step 4: Verify payment
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderData.data._id,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            clearCart();
            router.push(`/order-success?orderId=${orderData.data._id}`);
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#ffa3cc',
        },
      };

      // @ts-ignore - Razorpay is loaded via script
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Address Line 1 *
              </label>
              <input
                type="text"
                name="addressLine1"
                required
                value={formData.addressLine1}
                onChange={handleInputChange}
                className="input-field"
                placeholder="House number, building name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Address Line 2
              </label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Area, street name"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                  className="flex gap-3"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-gray-500">
                      {item.size} | {item.color}
                    </div>
                    <div className="text-gray-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

