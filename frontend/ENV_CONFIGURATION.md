# Environment Variables Configuration

## ✅ Your MongoDB Connection String is Ready!

Create a `.env.local` file in the `frontend` directory and paste these values:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=REPLACE_THIS_WITH_GENERATED_SECRET

# MongoDB Connection - YOUR ACTUAL CONNECTION STRING ✅
MONGODB_URI=mongodb+srv://pinkcherrywebsite_db_user:bCOJCgTGbCjmKm8G@pinkcherrycluster0.0tuwu33.mongodb.net/kidswear-store?retryWrites=true&w=majority

# Strapi CMS (Optional - uses sample data by default)
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token

# Razorpay (Payment Gateway) - Get test keys from https://razorpay.com
RAZORPAY_KEY_ID=your-razorpay-test-key-id
RAZORPAY_KEY_SECRET=your-razorpay-test-secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔐 Generate NextAuth Secret

Run this command to generate a secure secret:

**macOS/Linux:**
```bash
openssl rand -base64 32
```

**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and replace `REPLACE_THIS_WITH_GENERATED_SECRET` above.

## 🚀 Next Steps

1. **Create `.env.local` file** in the `frontend` folder
2. **Copy the configuration** from above
3. **Generate and add NextAuth secret** (see command above)
4. **Get Razorpay test keys:**
   - Sign up at https://razorpay.com
   - Go to Settings → API Keys → Generate Test Keys
   - Replace `your-razorpay-test-key-id` and `your-razorpay-test-secret`

5. **Install dependencies:**
   ```bash
   npm install
   ```

6. **Start the app:**
   ```bash
   npm run dev
   ```

## ✅ What's Already Configured

- ✅ MongoDB connection string (your actual database)
- ✅ Database name: `kidswear-store`
- ✅ Includes proper parameters for MongoDB Atlas

## ⚠️ Important Notes

- **Never commit `.env.local` to git** (already in .gitignore)
- The MongoDB connection includes your credentials - keep it secure!
- For production, create a new MongoDB user with a different password
- Use Razorpay **test keys** for development, **live keys** for production

## 🧪 Test Your MongoDB Connection

Once you have `.env.local` configured, the app will automatically:
1. Connect to your MongoDB Atlas cluster
2. Create a `kidswear-store` database
3. Set up `users` and `orders` collections when needed

You can verify the connection by:
- Registering a new user (it will be saved to MongoDB)
- Checking your MongoDB Atlas dashboard to see the new data

## 📝 Example: Complete .env.local File

Here's what your complete file should look like (with your secret filled in):

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=abc123xyz456def789ghi012jkl345==
MONGODB_URI=mongodb+srv://pinkcherrywebsite_db_user:bCOJCgTGbCjmKm8G@pinkcherrycluster0.0tuwu33.mongodb.net/kidswear-store?retryWrites=true&w=majority
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-api-token
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwx
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

You're all set! 🎉



