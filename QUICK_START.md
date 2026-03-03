# Quick Start Guide - White Eagle Backend Integration

## Overview
Your White Eagle application now has a complete full-stack setup with:
- **Frontend**: React with API integration
- **Backend**: Express server with SQLite database
- **Database**: Auto-initialized with seed data
- **AI**: Gemini API integration on backend

## 🚀 Quick Start (5 minutes)

### Step 1: Get your Gemini API Key
1. Go to [Google AI Studio](https://ai.google.dev/aistudio)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key

### Step 2: Setup Backend
```bash
cd server
npm install
```

Create `server/.env.local`:
```
PORT=5000
GEMINI_API_KEY=paste_your_key_here
NODE_ENV=development
ADMIN_PASSWORD=admin123
```

### Step 3: Setup Frontend
```bash
npm install
```

Create `.env.local` (in root):
```
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Run Both Services

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
You should see: `White Eagle Backend running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
You should see: `Local: http://localhost:5173`

### Step 5: Verify Everything Works
- Open http://localhost:5173
- Go to Home page and ask the AI something
- Click "Portfolio" to see projects from backend
- Click "Shop" to see products from backend
- All data is now coming from your backend!

## 📋 What Changed

### Frontend Pages Updated
All pages now use the **API Service** instead of localStorage:

1. **Portfolio.tsx** - Fetches projects from `/api/projects`
2. **Shop.tsx** - Fetches products from `/api/products`
3. **Gallery.tsx** - Fetches images from `/api/gallery`
4. **Reviews.tsx** - Fetches and creates reviews from `/api/reviews`
5. **Home.tsx** - Uses backend AI endpoint `/api/ai/advice`

### New Files Created

#### Backend Structure:
```
server/
├── server.ts                 # Express server entry point
├── database.ts               # SQLite setup & seeding
├── geminiService.ts          # Gemini API wrapper
├── package.json
├── .env.local               # Your local config
│
├── controllers/
│   ├── projectController.ts
│   ├── productController.ts
│   ├── reviewController.ts
│   └── galleryController.ts
│
├── routes/
│   ├── projects.ts
│   ├── products.ts
│   ├── reviews.ts
│   ├── gallery.ts
│   └── ai.ts
│
└── middleware/
    └── auth.ts             # Admin authentication
```

#### Frontend Services:
```
services/
├── apiService.ts           # NEW - Unified API client
└── geminiService.ts        # Still available for reference
```

## 🔐 Admin Features

To enable admin mode:
1. Open browser console: `F12`
2. Type: `localStorage.setItem('adminToken', 'admin123')`
3. Refresh the page
4. You'll see the green "Administrator Session Active" bar
5. Now you can:
   - Add/Edit/Delete Projects
   - Add/Edit/Delete Products  
   - Add Gallery Items
   - Manage inventory

## 📊 Database

The SQLite database (`whiteeagle.db`) is automatically created in `server/` directory with:

- **projects** table: All portfolio projects
- **products** table: Shop inventory
- **reviews** table: Customer reviews
- **gallery** table: Gallery images

To reset the database, delete the `whiteeagle.db` file and restart the server.

## 🔌 API Endpoints Reference

### Projects
```
GET    /api/projects              # Get all projects
GET    /api/projects?status=Ongoing
POST   /api/projects              # Create (admin)
PUT    /api/projects/:id          # Update (admin)
DELETE /api/projects/:id          # Delete (admin)
```

### Products
```
GET    /api/products              # Get all
GET    /api/products?category=Finishing
POST   /api/products              # Create (admin)
PUT    /api/products/:id          # Update (admin)
DELETE /api/products/:id          # Delete (admin)
```

### Reviews
```
GET    /api/reviews               # Get all
GET    /api/reviews?targetId=pr1  # By target
POST   /api/reviews               # Create (public)
```

### AI
```
POST   /api/ai/advice              # Ask AI something
POST   /api/ai/summarize-reviews   # Summarize reviews
```

## 🛠️ Troubleshooting

### "Backend not responding"
- Check port 5000 is running: `npm run dev` in server folder
- Check `.env.local` in server folder has correct `GEMINI_API_KEY`

### "API URL not found"
- Verify `.env.local` in root has: `VITE_API_URL=http://localhost:5000/api`

### "No data showing"
- Delete `server/whiteeagle.db` to reset database with seed data
- Restart both frontend and backend

### "Admin features not working"
- Make sure your admin token is set in localStorage
- Check server `.env.local` has `ADMIN_PASSWORD=admin123`

## 📝 Next Steps

1. **Deploy Backend**: 
   - Deploy to Railway, Render, or Heroku
   - Set environment variables on hosting platform

2. **Deploy Frontend**:
   - Run `npm run build`
   - Deploy `dist/` folder to Vercel/Netlify
   - Update `VITE_API_URL` to production backend URL

3. **Add More Features**:
   - Authentication system
   - Payment processing
   - Email notifications
   - Image upload

## 💡 Tips

- Use `npm run build` in server to compile TypeScript
- Check browser Network tab (F12) to see API calls
- Server logs show all API requests for debugging
- Database queries take < 10ms typically

## 🆘 Need Help?

Check these files for reference:
- API calls: `services/apiService.ts`
- Backend routes: `server/routes/*.ts`
- Database queries: `server/controllers/*.ts`
- Environment setup: `.env.local` files

---

**Your backend is now fully integrated! 🎉**

The application is now a true full-stack solution with persistent data storage and proper separation of concerns.
