// routes/users.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// POST create a user
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// PUT update a user
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User updated', user });
    } catch (err) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

export default router;
