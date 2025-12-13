# Quick Setup Guide

## 📋 Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] MongoDB Atlas account (free tier works)
- [ ] Razorpay account (for payments)
- [ ] Code editor (VS Code recommended)

## 🚀 Step-by-Step Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Replace `<username>` and `<password>` in the connection string

### 3. Setup Razorpay

1. Sign up at [Razorpay](https://razorpay.com)
2. Go to Settings → API Keys
3. Generate Test Keys for development
4. Copy Key ID and Key Secret

### 4. Configure Environment Variables

Create `.env.local` in the `frontend` directory:

```env
# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=paste-generated-secret-here

# MongoDB Atlas - Replace with your connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kidswear-store?retryWrites=true&w=majority

# Razorpay - Test keys for development
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here

# Strapi (Optional - uses sample data by default)
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Generate NextAuth Secret

**macOS/Linux:**
```bash
openssl rand -base64 32
```

**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output to `NEXTAUTH_SECRET` in `.env.local`

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✅ Verify Installation

1. **Home Page** - Should load with sample products
2. **Shop Page** - Should show product grid
3. **Register** - Create a test account
4. **Login** - Login with your account
5. **Add to Cart** - Add products to cart
6. **Cart** - View cart items
7. **Checkout** - Test checkout flow (use Razorpay test mode)

## 🔧 Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Error

- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Ensure username/password are correct
- Use `retryWrites=true&w=majority` in connection string

### NextAuth Session Issues

- Clear browser cookies and localStorage
- Regenerate `NEXTAUTH_SECRET`
- Check `NEXTAUTH_URL` matches your dev URL

### Razorpay Script Not Loading

- Check internet connection
- Verify Razorpay keys are correct
- Try in incognito mode to rule out extensions

## 📱 Test Mode Payments

Razorpay Test Cards:

**Success:**
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

**Failure:**
- Card: 4111 1111 1111 1234

## 🎨 Customization

### Change Color Theme

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#your-color-here',
    // ...other shades
  }
}
```

### Add More Products

Edit `frontend/app/api/products/route.ts` and add to `sampleProducts` array.

### Modify Cart Behavior

Edit `frontend/lib/store/cartStore.ts`

## 🚢 Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (from `.env.local`)
5. Deploy!

**Important:** Change `NEXTAUTH_URL` to your production domain.

### Environment Variables for Production

- Use production MongoDB cluster
- Use Razorpay live keys (not test keys)
- Generate new `NEXTAUTH_SECRET`
- Update `NEXT_PUBLIC_APP_URL`

## 📚 Next Steps

1. ✅ Complete basic setup
2. ✅ Test all features
3. 🔲 Setup Strapi CMS (optional)
4. 🔲 Add real product images
5. 🔲 Customize branding
6. 🔲 Add more features (wishlist, reviews, etc.)
7. 🔲 Deploy to production

## 🆘 Need Help?

- Check the main [README.md](./README.md)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Check [NextAuth.js Docs](https://next-auth.js.org)
- Visit [Razorpay Docs](https://razorpay.com/docs)

---

**Happy Coding! 🎉**




