# Troubleshooting Guide

## Common Issues & Solutions

### 1. Backend Connection Issues

#### Error: "Cannot connect to backend"
**Symptoms:** Frontend shows "Failed to fetch" errors, requests timeout

**Solutions:**
1. Verify backend is running: Check if you see "White Eagle Backend running on http://localhost:5000" in terminal
2. If not running, start it:
   ```bash
   cd server
   npm run dev
   ```
3. Check port 5000 is not in use:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```
4. If port is occupied, change PORT in `server/.env.local` to 5001, then update frontend `.env.local`:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

---

### 2. Database Issues

#### Error: "SQLITE_CANTOPEN" or database file errors
**Symptoms:** Backend crashes on startup, database connection fails

**Solutions:**
1. Delete the database file to reset it:
   ```bash
   rm server/whiteeagle.db    # Mac/Linux
   del server\whiteeagle.db   # Windows
   ```
2. Restart backend - it will auto-create a new database with seed data

#### No data showing in frontend
**Symptoms:** Pages load but no products/projects appear

**Solutions:**
1. Check database file exists: `server/whiteeagle.db`
2. Delete and restart (see above)
3. Check browser console for API errors (F12)
4. Verify API endpoint is correct in `.env.local`

---

### 3. API Key Issues

#### Error: "Gemini API Error" or "INVALID_ARGUMENT"
**Symptoms:** AI features don't work, building advice returns error

**Solutions:**
1. Verify API key is valid:
   - Go to [Google AI Studio](https://ai.google.dev/aistudio)
   - Create a new key if needed
   - Copy it exactly (no extra spaces)

2. Check `server/.env.local` has the key:
   ```
   GEMINI_API_KEY=your_exact_key_here
   ```

3. Restart backend after changing env:
   ```bash
   cd server
   npm run dev
   ```

4. If key keeps failing:
   - Check you're not in a restricted region
   - Verify API is enabled in Google Cloud Console
   - Try creating a new key

---

### 4. Environment Variables

#### Error: "GEMINI_API_KEY is undefined"
**Symptoms:** Backend starts but AI features fail immediately

**Solutions:**
1. Verify `server/.env.local` exists:
   ```bash
   # Mac/Linux
   ls server/.env.local
   
   # Windows
   dir server\.env.local
   ```

2. If missing, create it:
   ```
   PORT=5000
   GEMINI_API_KEY=your_key_here
   NODE_ENV=development
   ADMIN_PASSWORD=admin123
   ```

3. Restart backend

#### Error: "Cannot find module" in frontend
**Symptoms:** Frontend shows import errors in console

**Solutions:**
1. Verify `.env.local` exists in root directory (not in server/)
2. Check content:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
3. Restart frontend dev server

---

### 5. Installation Issues

#### Error: npm install fails
**Symptoms:** "command not found" or installation errors

**Solutions:**
1. Verify Node.js is installed:
   ```bash
   node --version
   npm --version
   ```
   
   Should show v16.0.0 or higher

2. Clear npm cache and retry:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Delete `node_modules` and `package-lock.json`, then reinstall:
   ```bash
   rm -rf node_modules package-lock.json  # Mac/Linux
   del node_modules package-lock.json     # Windows
   npm install
   ```

#### Different error: Permission denied
**Solutions:**
```bash
# Mac/Linux - try with sudo
sudo npm install

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install
```

---

### 6. Port Already in Use

#### Error: "EADDRINUSE: address already in use :::5000"
**Symptoms:** Backend won't start, says port is occupied

**Solutions:**
1. Kill process using port 5000:
   ```bash
   # Mac/Linux
   kill -9 $(lsof -t -i:5000)
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. Or use a different port:
   - Edit `server/.env.local`: `PORT=5001`
   - Edit root `.env.local`: `VITE_API_URL=http://localhost:5001/api`
   - Restart both services

---

### 7. Admin Features Not Working

#### Admin panel doesn't appear
**Symptoms:** No green "Administrator Session Active" bar

**Solutions:**
1. Set admin token in browser console (F12):
   ```javascript
   localStorage.setItem('adminToken', 'admin123');
   ```

2. Refresh page (Ctrl+R or Cmd+R)

3. If still not showing:
   - Check browser console for errors
   - Verify backend is running
   - Try incognito/private window

#### Can't create/edit/delete items as admin
**Symptoms:** Button clicks don't work or show 403 error

**Solutions:**
1. Verify admin token is set (see above)
2. Check `server/.env.local` has `ADMIN_PASSWORD=admin123`
3. Restart backend
4. Verify request header includes: `Authorization: Bearer admin123`
5. Check browser Network tab (F12) to see actual API response

---

### 8. Data Not Persisting

#### Changes are lost after refresh
**Symptoms:** Added items disappear on page reload

**Solutions:**
1. Check backend is running (should be)
2. Verify database file exists: `server/whiteeagle.db`
3. Check browser Network tab for failed requests (F12)
4. Check backend terminal for error messages
5. Try deleting database and restarting:
   ```bash
   rm server/whiteeagle.db
   npm run dev  # in server folder
   ```

---

### 9. Frontend Build Issues

#### Error: "command not found: npm run build"
**Symptoms:** Build command fails

**Solutions:**
1. Ensure you're in root directory:
   ```bash
   pwd  # Should show path ending in /whiteeagle
   ```

2. Check `package.json` exists in current directory

3. Try explicit npm path:
   ```bash
   npx npm run build
   ```

#### Build takes forever or crashes
**Solutions:**
1. Clear build cache:
   ```bash
   rm -rf dist
   npm run build
   ```

2. Increase Node memory:
   ```bash
   export NODE_OPTIONS=--max-old-space-size=4096
   npm run build
   ```

---

### 10. CORS Errors

#### Error: "Access to XMLHttpRequest blocked by CORS policy"
**Symptoms:** Frontend requests fail, console shows CORS error

**Solutions:**
1. Verify backend has CORS enabled (it should)
2. Check frontend URL is in allowed origins
3. Add to `server/server.ts` if needed:
   ```typescript
   app.use(cors({
     origin: 'http://localhost:5173',
     credentials: true
   }));
   ```

4. Restart backend

---

### 11. TypeScript Errors

#### Error: "Cannot find module" or type errors
**Symptoms:** Red squiggly lines in editor, build fails

**Solutions:**
1. Ensure all files saved (Ctrl+S or Cmd+S)
2. Restart VS Code
3. Check `tsconfig.json` exists in both root and server/
4. Run `npm run build` to see actual errors:
   ```bash
   npm run build  # frontend
   cd server && npm run build  # backend
   ```

---

### 12. Development Server Issues

#### Frontend dev server won't start
**Symptoms:** "npm run dev" fails or port 5173 not accessible

**Solutions:**
1. Kill existing Vite process:
   ```bash
   # Mac/Linux
   kill -9 $(lsof -t -i:5173)
   
   # Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   ```

2. Clear Vite cache:
   ```bash
   rm -rf .vite
   npm run dev
   ```

3. Use different port:
   ```bash
   npm run dev -- --port 3000
   ```

---

## Debug Checklist

✅ Both services running?
- Backend: "npm run dev" in server/ folder
- Frontend: "npm run dev" in root folder

✅ Environment variables set?
- Frontend: `.env.local` with `VITE_API_URL`
- Backend: `server/.env.local` with `GEMINI_API_KEY`

✅ Ports available?
- Frontend: 5173 (or custom)
- Backend: 5000 (or custom)

✅ Database file exists?
- `server/whiteeagle.db` (auto-created)

✅ Node modules installed?
- Both root `npm install` and `server npm install`

✅ No TypeScript errors?
- Check terminal for build errors

✅ Network requests working?
- Check browser Network tab (F12)

✅ API responding?
- Visit http://localhost:5000/api/health

---

## Getting Logs

### Backend Logs
All logs appear in the terminal where you ran `npm run dev`
Look for:
- Database initialization messages
- API request logs  
- Error messages

### Frontend Logs
Open browser Developer Tools (F12):
- Console tab: shows all JS errors and logs
- Network tab: shows all API requests/responses
- Application tab: shows localStorage and cookies

### Database Logs
Enable SQLite logging in `database.ts`:
```typescript
db.configure('verbose', console.log);
```

---

## Still Stuck?

1. Check all three documentation files:
   - `QUICK_START.md` - Setup overview
   - `BACKEND_SETUP.md` - Detailed backend info
   - `INTEGRATION_SUMMARY.md` - Architecture overview

2. Verify environment files:
   - `.env.local` (frontend)
   - `server/.env.local` (backend)

3. Check API health:
   - Visit `http://localhost:5000/api/health`
   - Should return: `{"status":"OK",...}`

4. Reset everything:
   - Delete `server/whiteeagle.db`
   - Delete root `node_modules` and `server/node_modules`
   - Delete `server/dist`
   - Run `npm install` and `cd server && npm install`
   - Restart both services

---

## Contact & Support

For additional help:
1. Check the project documentation
2. Review backend terminal output
3. Check browser console (F12)
4. Check Network tab for actual API responses

Most issues are solved by:
1. Restarting services
2. Checking environment variables
3. Resetting the database
4. Clearing caches
