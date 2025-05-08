import express from 'express';
import mongoose from 'mongoose';
import exphbs from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/users.js';

const app = express();

// Setup directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/libraryApp';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Configure Handlebars
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'layout'
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Mount API routes
app.use('/api/users', userRoutes);

// Web page routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', hideHeader: true });
});

app.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign In' });
});

app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
