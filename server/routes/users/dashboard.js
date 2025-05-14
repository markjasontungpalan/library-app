//user.dashboard.js

import express from 'express';
const router = express.Router();

//User home page
router.get('/dashboard', (req, res) => {
  const user = req.session.user; // get user from session

  // Optional: redirect to signin if not logged in
  if (!user) {
    return res.redirect('/signin');
  }

  res.render('user/dashboard', {
    title: 'User Dashboard',
    username: user.name // 👈 pass the username to the view
  });
});


export default router;