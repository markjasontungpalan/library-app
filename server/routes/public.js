import express from 'express';
import User from '../models/User.js';

const router = express.Router();

//--------------------Home-------------------
router.get('/', (req, res) => 
    res.render(
        'public/index', 
        { 
            title: 'Home', 
            hideHeader: true 
        }
    )
);

// ------------------Sign in page-----------------------
router.get('/signin', (req, res) => 
    res.render(
        'public/signin', 
        { 
            title: 'Sign In' 
        }
    )
);

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });

    // 2. Handle user not found or wrong password
    if (!user || user.password !== password) {
      return res.render('public/signin', {
        title: 'Sign In',
        error: 'Invalid email or password',
        email // Preserve input value
      });
    }

    // 3. Save user info in session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // 4. Redirect based on role
    if (user.role === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/user/dashboard');
    }

  } catch (err) {
    console.error('Signin error:', err);
    res.render('public/signin', {
      title: 'Sign In',
      error: 'Something went wrong. Please try again.'
    });
  }
});

// ------------------Register---------------------------
router.get('/register', (req, res) => 
    res.render(
        'public/register', 
        { 
            title: 'Register' 
        }
    )
);

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render('public/register', {
                title: 'Register',
                error: 'Email already in use.'
            });
        }

        // Create and save new user with default role "user"
        const newUser = new User({
            name,
            email,
            password,  // TODO: hash this later
        });

        await newUser.save();           //save to database

        // Redirect to dashboard or signin
        res.redirect('/signin');
    } catch (err) {
        console.error(err);
        res.render('public/register', {
            title: 'Register',
            error: 'Something went wrong. Please try again.'
        });
    }

})
export default router;