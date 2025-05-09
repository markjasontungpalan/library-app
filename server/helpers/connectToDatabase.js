//connectToDatabase.js
//This function establishes connection to mongoDB

import mongoose from 'mongoose';
import { createDefaultAdmin } from './createDefaultAdmin.js';

// import User from '../models/User.js';

export async function connectToDatabase(MONGODB_URI) {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');

        await createDefaultAdmin();

    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
}
