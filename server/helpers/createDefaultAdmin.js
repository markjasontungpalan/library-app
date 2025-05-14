// createDefaultAdmin.js
//This function creates an admin user during connection to database
import User from '../models/User.js';

export async function createDefaultAdmin() {
    try {
        const adminExists = await User.findOne({ role: 'admin' });

        if (!adminExists) {
            const adminUser = new User({
                name: 'Administrator',
                email: 'admin@gmail.com',
                password: 'admin123',   // Plaintext for now
                role: 'admin'
            });

            await adminUser.save();
            console.log('✅ Default admin user created: username = admin, password = admin123');
        } else {
            console.log('ℹ️ Admin user already exists');
        }
    } catch (error) {
        console.error('❌ Error creating default admin:', error);
    }
}
