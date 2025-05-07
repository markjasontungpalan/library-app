import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
// 'User' → the model name
// This is the singular name of your model.
// Mongoose automatically pluralizes and lowercases it to figure out the MongoDB collection name.

// userSchema → the schema definition
// This is the schema object you defined:

export default User;
