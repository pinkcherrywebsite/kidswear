/**
 * NextAuth Route Handler
 * Handles authentication requests
 */

import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Ensure this is a dynamic route
export const dynamic = 'force-dynamic';


