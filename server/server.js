import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectToDatabase } from './helpers/connectToDatabase.js';
import { configureHandlebars } from './helpers/configureHandlebars.js';
import publicRoutes from './routes/public.js'
import userRoutes from './routes/users/dashboard.js'
import dotenv from 'dotenv';
import  session  from 'express-session'

dotenv.config();  // Load .env before using it

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET || 'librarysecret',
  resave: false,
  saveUninitialized: false
}));

// Setup directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);         //returns current directory of server.js

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Connect to MongoDB
connectToDatabase(process.env.MONGODB_URI);

// Configure Handlebars
const viewsPath = path.join(__dirname, 'views');
configureHandlebars(app, viewsPath);

//public pages
app.use('/', publicRoutes); //for all public routes under /, use publicRoutes
app.use('/user', userRoutes ) //mount routes for users

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
