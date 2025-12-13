# Pink Cherry - Kids Wear eCommerce Store

A modern, full-stack eCommerce web application built with Next.js 15 for selling kids wear products.

## 🎨 Features

- **Modern UI/UX** with soft pink theme and responsive design
- **Product Catalog** with categories, filters, and detailed product pages
- **Shopping Cart** with persistent state using Zustand
- **User Authentication** with NextAuth.js (JWT + Credentials)
- **Checkout Flow** with Razorpay payment integration
- **Order Management** with order history and tracking
- **Admin CMS** integration with Strapi (backend)
- **Mobile-First** responsive design with TailwindCSS

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Authentication:** NextAuth.js
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image

### Backend
- **API Routes:** Next.js API Routes
- **Database:** MongoDB Atlas (via Mongoose)
- **CMS:** Strapi (self-hosted)
- **Payment Gateway:** Razorpay
- **Authentication:** JWT with bcrypt

## 📁 Project Structure

```
frontend/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── products/          # Product endpoints
│   │   ├── orders/            # Order endpoints
│   │   └── payment/           # Payment endpoints
│   ├── cart/                  # Shopping cart page
│   ├── checkout/              # Checkout page
│   ├── login/                 # Login/Register page
│   ├── product/[slug]/        # Product detail page
│   ├── shop/                  # Shop listing page
│   ├── order-success/         # Order confirmation page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                 # Reusable components
│   ├── providers/             # Context providers
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── lib/                       # Utilities and libraries
│   ├── models/                # MongoDB models
│   │   ├── User.ts
│   │   └── Order.ts
│   ├── store/                 # Zustand stores
│   │   └── cartStore.ts
│   ├── mongodb.ts             # Database connection
│   └── types.ts               # TypeScript types
├── public/                    # Static assets
├── types/                     # Type definitions
│   └── next-auth.d.ts
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # TailwindCSS configuration
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- Strapi CMS (optional, uses sample data by default)
- Razorpay account (for payment integration)

### Installation

1. **Clone the repository**
   ```bash
   cd "Pink Cherry/frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the `frontend` directory:
   
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-generate-with-openssl
   
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kidswear-store?retryWrites=true&w=majority
   
   # Strapi CMS (optional)
   STRAPI_URL=http://localhost:1337
   STRAPI_API_TOKEN=your-strapi-api-token
   
   # Razorpay Payment Gateway
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output to `NEXTAUTH_SECRET` in `.env.local`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Sample Data

The app comes with sample product data in `/api/products/route.ts`. This allows you to test the application without setting up Strapi immediately.

To connect to Strapi:
1. Set up Strapi CMS separately
2. Configure products and categories in Strapi
3. Update the API routes to fetch from Strapi instead of sample data

## 🔐 Authentication

The app uses NextAuth.js with credentials provider:

- **Register:** Create a new account with name, email, and password
- **Login:** Authenticate with email and password
- **Session:** JWT-based sessions stored securely
- **Protected Routes:** Checkout and order pages require authentication

## 💳 Payment Integration

Razorpay is integrated for payment processing:

1. User completes checkout form
2. Order is created in database
3. Razorpay checkout modal opens
4. Payment is processed securely
5. Payment verification happens on the server
6. Order status is updated
7. User is redirected to success page

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All components are designed mobile-first with TailwindCSS.

## 🎨 Theme Customization

The color theme is configured in `tailwind.config.ts`:

- **Primary:** Soft pink (#ffa3cc)
- **Secondary:** Cream/white (#fefdfb)
- **Accent:** Pink variants

To customize colors, edit the `colors` section in the Tailwind config.

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Products
- `GET /api/products` - List all products (with filters)
- `GET /api/products/[slug]` - Get single product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment signature

## 🗃️ Database Schema

### User Model
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  addresses: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```typescript
{
  userId: ObjectId,
  orderNumber: String,
  items: Array,
  totalAmount: Number,
  shippingAddress: Object,
  paymentMethod: String,
  paymentStatus: Enum,
  orderStatus: Enum,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Secure random string
- `MONGODB_URI` - MongoDB Atlas connection string
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- Other variables as needed

## 📦 Key Dependencies

- `next` - React framework
- `react` & `react-dom` - React library
- `next-auth` - Authentication
- `mongoose` - MongoDB ODM
- `zustand` - State management
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `bcryptjs` - Password hashing
- `razorpay` - Payment processing

## 🤝 Contributing

This is a sample project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🐛 Known Issues

- Razorpay script needs to be added to the document for checkout to work
- Sample product images use Unsplash URLs (replace with your own in production)
- Image optimization may require custom loader for production

## 📞 Support

For issues or questions:
- Check the documentation above
- Review Next.js 15 documentation
- Check NextAuth.js documentation
- Review Razorpay integration docs

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Vercel for hosting platform
- MongoDB for database
- Razorpay for payment integration

---

**Built with ❤️ using Next.js 15 and TypeScript**




