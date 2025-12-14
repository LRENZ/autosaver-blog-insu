# AutoSaver - Car Insurance Niche Blog

A high-performance **Car Insurance Blog** with a public-facing website and a **secure Admin Dashboard** for content management, built with Next.js 14+ App Router and **Cloudflare D1 Database**.

## 🚀 Features

### Public Website
- **SEO-Optimized Homepage** with hero section, blog grid, and location listings
- **Dynamic Blog Posts** with category filtering (Savings, Guides, Location) - **9 Published Articles**
- **State-Specific Landing Pages** for targeted insurance information - **3 Complete Guides**
- **Responsive Design** using Tailwind CSS
- **Legal Pages** (Privacy Policy, Terms of Use)
- **Conversion-Focused UI** with clear CTAs
- **🆕 Popup Marketing System** - Conversion-optimized promotional popups

### Admin Dashboard
- **Complete CMS** for managing blog articles
- **CRUD Operations** using Next.js Server Actions with D1 Database
- **Post Management** with status tracking (Published/Draft)
- **🆕 Popup Management** - Create and manage promotional popups with triggers
- **Rich Editor Interface** with SEO meta fields
- **Clean, Utilitarian Design** optimized for content management
- **Sidebar Navigation** for easy admin access
- **Real-time Database** with comprehensive seed data

### Security
- **🆕 Cloudflare Zero Trust Ready** - Enterprise-grade authentication for admin panel
- **Protected Admin Routes** - `/admin/*` path protection
- **Multiple Auth Options** - Google OAuth, GitHub, Email OTP

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** Cloudflare D1 (SQLite)
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form + Zod (ready to integrate)
- **State Management:** Server Actions
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages (configured)

## 📁 Project Structure

```
webapp/
├── app/
│   ├── page.tsx                    # Public homepage
│   ├── layout.tsx                  # Root layout with Header/Footer
│   ├── blog/[slug]/page.tsx        # Dynamic blog post pages
│   ├── location/[slug]/page.tsx    # Dynamic location pages
│   ├── privacy-policy/page.tsx     # Privacy policy
│   ├── terms-of-use/page.tsx       # Terms of use
│   └── admin/
│       ├── layout.tsx              # Admin layout with sidebar
│       ├── page.tsx                # Admin dashboard
│       ├── posts/
│       │   ├── page.tsx            # Posts list
│       │   ├── create/page.tsx     # Create new post
│       │   └── edit/[id]/page.tsx  # Edit existing post
│       └── settings/page.tsx       # Settings page
├── components/
│   ├── Header.tsx                  # Public site header
│   ├── Footer.tsx                  # Public site footer
│   ├── AdminSidebar.tsx            # Admin navigation
│   ├── Button.tsx                  # Reusable button component
│   ├── Input.tsx                   # Form input component
│   ├── Textarea.tsx                # Form textarea component
│   └── DeletePostButton.tsx        # Client component for delete action
├── lib/
│   ├── actions.ts                  # Server Actions (CRUD operations)
│   ├── data.ts                     # Mock data (replace with DB later)
│   ├── types.ts                    # TypeScript types
│   └── utils.ts                    # Utility functions
└── middleware.ts                   # Route protection (ready for auth)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open your browser:**
- Public site: [http://localhost:3000](http://localhost:3000)
- Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Current Status

### ✅ Completed Features
1. ✅ Public homepage with hero section, blog grid, and location listings
2. ✅ Dynamic blog post pages with SEO optimization
3. ✅ Dynamic location pages for state-specific content
4. ✅ Admin dashboard with statistics overview
5. ✅ Complete post management (Create, Read, Update, Delete)
6. ✅ Server Actions for all CRUD operations
7. ✅ Responsive design with Tailwind CSS
8. ✅ Legal pages (Privacy Policy, Terms of Use)
9. ✅ Middleware structure for admin route protection

### 🔄 Ready for Integration
1. **Database Integration** - Currently using mock data in `lib/data.ts`
   - Ready to connect: Supabase, PostgreSQL, MongoDB, etc.
   - All Server Actions in `lib/actions.ts` are structured for easy DB integration

2. **Authentication** - Middleware structure in place
   - Ready to add: NextAuth.js, Clerk, Auth0, or Firebase Auth
   - Protect `/admin` routes with your chosen auth provider

3. **Form Validation** - Dependencies installed
   - React Hook Form + Zod already included
   - Can be added to any form component

## 🔐 Security Notes

### Admin Routes Protection
The `middleware.ts` file contains a basic structure for protecting admin routes. **Important:** Before deploying to production, implement proper authentication:

```typescript
// TODO in middleware.ts:
// 1. Add authentication provider (NextAuth.js, Clerk, etc.)
// 2. Verify user tokens/sessions
// 3. Redirect unauthorized users to login page
```

### Current State (Development Only)
- Admin routes are currently **accessible without authentication**
- This is intentional for development and testing
- **Must implement authentication before production deployment**

## 📝 Data Models

### Post Type
```typescript
interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'Savings' | 'Guides' | 'Location';
  coverImage: string;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}
```

### Location Type
```typescript
interface Location {
  id: string;
  name: string;
  slug: string;
  state: string;
  description: string;
  averageRate: string;
}
```

## 🎨 Design System

### Colors
- **Primary (Orange):** `#EA580C` (orange-600) - CTAs and important actions
- **Success (Green):** `#16A34A` (green-600) - Trust indicators
- **Text:** Gray scale from 100 to 900

### Typography
- **Headings:** Bold, large sizes (text-4xl to text-5xl)
- **Body:** Inter font family
- **CTA Buttons:** Font-semibold with shadow effects

### Components
- **Public Side:** Friendly, trustworthy, high-contrast CTAs
- **Admin Side:** Clean, utilitarian, table-based layouts

## 📚 Key Pages and Routes

### Public Routes
- `/` - Homepage
- `/blog/[slug]` - Individual blog posts
- `/location/[slug]` - State-specific landing pages
- `/privacy-policy` - Privacy policy
- `/terms-of-use` - Terms of use

### Admin Routes (Protected)
- `/admin` - Dashboard overview
- `/admin/posts` - All posts list
- `/admin/posts/create` - Create new post
- `/admin/posts/edit/[id]` - Edit existing post
- `/admin/settings` - Settings page (placeholder)

## 🚀 Deployment

### Cloudflare Pages (Recommended)
This project is optimized for Cloudflare Pages deployment:

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
# The build output is in the .next directory
```

### Vercel
```bash
# Connect to Vercel
vercel

# Deploy
vercel --prod
```

### Other Platforms
The standard Next.js build works on any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 📦 Next Steps

1. **Connect a Database**
   - Replace mock data in `lib/data.ts` with real database queries
   - Update Server Actions in `lib/actions.ts` to use database

2. **Add Authentication**
   - Implement NextAuth.js or another auth provider
   - Protect admin routes in `middleware.ts`

3. **Add Form Validation**
   - Integrate React Hook Form + Zod in form components
   - Add client-side validation to admin forms

4. **Enhance SEO**
   - Add Open Graph images
   - Implement structured data (JSON-LD)
   - Add sitemap and robots.txt

5. **Add Analytics**
   - Google Analytics
   - Plausible or Fathom for privacy-focused analytics

## 📄 License

This project is provided as-is for development purposes.

## 🤝 Contributing

This is a starter template. Feel free to customize it for your specific needs!

---

**Note:** This project uses mock data for demonstration. Before deploying to production, implement proper database integration and authentication.
