<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# White Eagle Home Decor & Landscapers - Full Stack Application

A complete full-stack web application for White Eagle Home Decor & Landscapers featuring a React frontend with Vite, Express.js backend with SQLite database, and Google Gemini AI integration.

## 🎯 Project Features

- **Frontend**: Modern React 19 + TypeScript with Tailwind CSS
- **Backend**: Express.js API with SQLite database
- **AI Integration**: Google Generative AI (Gemini) for design consulting
- **Admin Panel**: Content management system for projects, products, and gallery
- **Full CRUD**: Complete data management across all resources
- **Real-time Sync**: Persistent data storage with instant updates

## 📋 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### For Windows Users
Double-click `setup.bat` to automatically configure everything:
```
setup.bat
```

### For Mac/Linux Users
Run the setup script:
```bash
bash setup.sh
```

### Manual Setup

**Backend Setup:**
```bash
cd server
npm install
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY
npm run dev
```

**Frontend Setup (in new terminal):**
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`  
The API will be at `http://localhost:5000/api`

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get up and running in 5 minutes
- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Complete backend documentation
- **[API Reference](#api-reference)** - Full API endpoints documentation

## 🏗️ Architecture

```
whiteeagle/
├── Frontend (React + TypeScript)
│   ├── pages/          # Route pages
│   ├── components/     # Reusable components  
│   ├── services/       # API client
│   └── types.ts        # TypeScript interfaces
│
└── Backend (Express + SQLite)
    └── server/
        ├── routes/       # API endpoints
        ├── controllers/  # Business logic
        ├── models/       # Database models
        └── middleware/   # Auth & utilities
```

## 🔌 API Reference

### Projects
- `GET /api/projects` - Get all projects (with optional status filter)
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Products  
- `GET /api/products` - Get all products (with optional category filter)
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review (public)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Add gallery item (admin)
- `DELETE /api/gallery/:id` - Delete gallery item (admin)

### AI Services
- `POST /api/ai/advice` - Get building/design advice
- `POST /api/ai/summarize-reviews` - Summarize customer reviews

## 🔐 Admin Authentication

Include the admin password in request header:
```
Authorization: Bearer admin123
```

To enable admin mode in UI:
```javascript
localStorage.setItem('adminToken', 'admin123');
```

## 🗄️ Database

SQLite database automatically initializes with seed data:
- Projects (portfolio)
- Products (shop inventory)
- Reviews (customer feedback)
- Gallery (images and captions)

Reset database by deleting `server/whiteeagle.db`

## 🚀 Development Commands

**Frontend:**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

**Backend:**
```bash
cd server
npm run dev       # Start with hot reload
npm run build     # Compile TypeScript
npm start         # Run production build
```

## 🌍 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to Vercel, Netlify, or similar
```

### Backend Deployment  
```bash
cd server
npm run build
# Deploy to Railway, Render, Heroku, or similar
# Set GEMINI_API_KEY environment variable
```

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.4
- TypeScript 5.8.2
- Tailwind CSS
- Vite 6.2.0

**Backend:**
- Express.js
- TypeScript
- SQLite3
- Google Generative AI SDK

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env.local)
```
PORT=5000
GEMINI_API_KEY=your_key_here
NODE_ENV=development
ADMIN_PASSWORD=admin123
```

## 🎨 Features

### User Features
- Browse projects and portfolio
- View products and request quotes
- Submit reviews and feedback
- AI-powered design consultation
- Gallery browsing with filtering

### Admin Features  
- Create/edit/delete projects
- Manage product inventory
- Curate gallery images
- Monitor reviews
- Admin-only content management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

© 2024 White Eagle Home Decor & Landscapers. All rights reserved.

---

**Need help?** Check [QUICK_START.md](QUICK_START.md) or [BACKEND_SETUP.md](BACKEND_SETUP.md)
