import express from 'express';
const router = express.Router();

router.get('/', (req, res) => 
    res.render(
        'index', 
        { 
            title: 'Home', 
            hideHeader: true 
        }
    )
);

router.get('/signin', (req, res) => 
    res.render(
        'signin', 
        { 
            title: 'Sign In' 
        }
    )
);

router.get('/register', (req, res) => 
    res.render(
        'register', 
        { 
            title: 'Register' 
        }
    )
);

export default router;