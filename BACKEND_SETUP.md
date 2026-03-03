# White Eagle - Full Stack Application

This is a complete full-stack application for White Eagle Home Decor & Landscapers, featuring both a React frontend and a Node.js backend with database integration.

## Project Structure

```
whiteeagle/
├── Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── index.tsx
│   └── vite.config.ts
│
└── Backend (Node.js + Express + SQLite)
    └── server/
        ├── routes/
        ├── controllers/
        ├── middleware/
        └── server.ts
```

## Features

### Frontend
- **Pages**: Home, Portfolio, Shop, Gallery, Reviews
- **Admin Mode**: Toggle admin functionality for content management
- **AI Consulting**: Integration with Gemini AI for design advice
- **Real-time Updates**: All data synced with backend

### Backend
- **RESTful API** with endpoints for:
  - Projects (CRUD operations)
  - Products (CRUD operations)
  - Reviews (Create & Read)
  - Gallery (CRUD operations)
  - AI Services (Building advice & Review summarization)
- **SQLite Database** with automatic seeding
- **Admin Authentication** via Bearer token
- **CORS Support** for frontend communication

## Setup & Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

3. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```
PORT=5000
GEMINI_API_KEY=your_actual_gemini_api_key
NODE_ENV=development
ADMIN_PASSWORD=admin123
```

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?status=Ongoing` - Filter by status
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Finishing` - Filter by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews?targetId=pr1` - Filter by target
- `POST /api/reviews` - Create review (public)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Create gallery item (admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (admin only)

### AI Services
- `POST /api/ai/advice` - Get building advice
  - Body: `{ "query": "your question" }`
- `POST /api/ai/summarize-reviews` - Summarize reviews
  - Body: `{ "reviews": ["review1", "review2"] }`

## Admin Authentication

For protected endpoints, include the admin token in the request header:

```
Authorization: Bearer admin123
```

## Database

The SQLite database automatically initializes on first run with the following tables:
- `projects` - Project data
- `products` - Product inventory
- `reviews` - Customer reviews
- `gallery` - Gallery images

### Environment Variables

#### Frontend (.env.local)
- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000/api)

#### Backend (server/.env.local)
- `PORT` - Server port (default: 5000)
- `GEMINI_API_KEY` - Google Gemini API key (required)
- `NODE_ENV` - Environment (development/production)
- `ADMIN_PASSWORD` - Admin authentication password

## Development

### Frontend Development
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Development
```bash
cd server
npm run dev      # Start with hot reload
npm run build    # Build TypeScript
npm start        # Run production build
```

## Technologies

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript, SQLite
- **AI**: Google Generative AI (Gemini)
- **Styling**: Tailwind CSS
- **Database**: SQLite3 with sql.js wrapper

## API Service

The frontend uses a unified `apiService.ts` that handles all communication with the backend, including:
- Automatic error handling
- Authentication token management
- Response formatting
- Fallback values for graceful degradation

## Deployment

### Frontend
- Build: `npm run build`
- Deploy the `dist/` folder to any static hosting (Vercel, Netlify, etc.)

### Backend
- Build: `cd server && npm run build`
- Deploy to Node.js hosting (Heroku, Railway, AWS EC2, etc.)
- Ensure `GEMINI_API_KEY` is set in production environment

## Troubleshooting

**Backend not connecting**: Ensure the server is running on port 5000 and the frontend `.env.local` has `VITE_API_URL=http://localhost:5000/api`

**Database errors**: Delete the `whiteeagle.db` file in the server directory to reset the database

**Gemini API errors**: Verify your `GEMINI_API_KEY` is valid and has proper permissions

## License

© 2024 White Eagle Home Decor & Landscapers
