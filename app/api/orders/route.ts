/**
 * Orders API Route
 * Handles order creation and retrieval
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { authOptions } from '../auth/[...nextauth]/route';

/**
 * POST /api/orders - Create new order
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { items, totalAmount, shippingAddress, paymentMethod } = await req.json();

    // Validate input
    if (!items || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Generate unique order number
    const orderNumber = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = await Order.create({
      userId: session.user.id,
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'razorpay',
      paymentStatus: 'pending',
      orderStatus: 'processing',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders - Get user's orders
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch user's orders
    const orders = await Order.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}




