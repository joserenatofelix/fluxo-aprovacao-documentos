import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Supondo que você tenha um modelo User

// ...existing code...

async function createAdminUser() {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const adminUser = new User({
            username: 'admin',
            password: hashedPassword,
            role: 'admin'
        });
        await adminUser.save();
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }
}

mongoose.connection.once('open', () => {
    createAdminUser().catch(err => console.error(err));
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ...existing code...
