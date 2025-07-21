const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const { generateAccesToken, generateRefreshToken } = require('./jwt.controller');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [rows] = await db.execute(
            'SELECT * FROM User WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username credentials' });
        }

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username credentials' });
        }

        const token = generateAccesToken({ userid: user.id, role: user.role });
        const refresh = generateRefreshToken({ userid: user.id, role: user.role });

        res.status(200).json({ refresh, token, status: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = login;
