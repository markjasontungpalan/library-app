# 📚 Library App — Full Stack Setup (React + Express + MongoDB)

This guide will help you set up the folder structure, React frontend, Express backend, and MongoDB connection for the Library App.

---

## 📦 Folder Structure

    library-app/
    ├── client/ → React + Vite frontend
    ├── server/ → Express backend + MongoDB


---

## 🚀 Setup Instructions

### ✅ 1. Create project folder

```bash
mkdir library-app
cd library-app

✅ 2. Set up React + Vite frontend

npm create vite@latest client -- --template react               
    # creates required folders and package.json
cd client
npm install
    # install React dependencies
Set proxy in client/vite.config.js:

    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
        '/api': 'http://localhost:5000'                         // allows React to hook into backend
        }
    }
    });


✅ 3. Set up Express backend

mkdir server
cd server
npm init -y                 
    # creates package.json
npm install express mongoose cors                   
    # express → the web framework to build the backend server and API routes.
    # mongoose → connects to MongoDB + defines models and schemas.
    # cors → middleware that allows the React frontend (running on another port) to communicate with the Express backend.
npm install --save-dev nodemon
    # --save-dev → Marks it as a development-only tool, not needed in production.
    # nodemon →  automatically restarts your server when you make code changes.
Update server/package.json scripts:

    "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
    }

✅ 4. Create backend files

touch app.js
mkdir routes models controllers helpers
    # create backend folders

✅ 5. Example backend app.js

    import express from 'express';
    import cors from 'cors';

    const app = express();
    const PORT = 5000;

    app.use(cors());
    app.use(express.json());

    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello from Express!' });
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
✅ 6. Run backend + frontend
In /server:
    npm run dev

In /client:
    npm run dev

✅ 7. Connect React to backend
In React App.js:

    useEffect(() => {
        fetch('/api/hello')
            .then(res => res.json())
            .then(data => setMessage(data.message));
    }, []);

✅ 8. Set up MongoDB (optional)
Later, in server/helpers/connectDB.js:

    import mongoose from 'mongoose';

    export async function connectDB(uri) {
        try {
            await mongoose.connect(uri);
            console.log('✅ Connected to MongoDB');
        } catch (err) {
            console.error('❌ MongoDB connection error:', err);
            process.exit(1);
        }
    }

Call in app.js:

    import { connectDB } from './helpers/connectDB.js';
    connectDB('mongodb://localhost:27017/librarydb');

# ---------------------------------------
⚙ Environment Notes
    React runs on localhost:3000
    Express runs on localhost:5000

    The frontend uses proxy (/api) to forward API requests to the backend.

📦 Future Setup Notes
    Add .env files for API keys and DB URIs
    Add MongoDB connection logic in server/helpers/connectDB.js
    Use models inside server/models/ for books, users, etc.

📄 Useful Scripts
In client/package.json:

    "scripts": {
        "dev": "vite",
        "build": "vite build"
    }

In server/package.json:


    "scripts": {
        "dev": "nodemon app.js",
        "start": "node app.js"
    }
