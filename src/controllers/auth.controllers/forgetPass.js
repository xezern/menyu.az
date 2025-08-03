const db = require('../../config/db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xxx@gmail.com',
        pass: '________' 
    }
});

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM User WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'User with this email does not exist' });
        }

        const user = rows[0];
        const token = crypto.randomBytes(32).toString('hex');
        const expires = Date.now() + 3600000; 

        await db.execute(
            'UPDATE User SET resetToken = ?, resetTokenExpires = ? WHERE id = ?',
            [token, new Date(expires), user.id]
        );

        const resetLink = `http://localhost:3000/reset-password?token=${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: 'Reset Password',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`
        });

        res.json({ message: 'Reset link sent to your email' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = forgotPassword;
