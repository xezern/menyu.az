const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userid = req.user.id;

    console.log(oldPassword, newPassword, confirmPassword);


    if (!userid) {
        return res.status(400).json({ error: 'User ID missing' });
    }

    if (!newPassword || !confirmPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM User WHERE id = ?', [userid]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Old password is incorrect' });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE User SET password = ? WHERE id = ?', [hashed, userid]);

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = changePassword;
