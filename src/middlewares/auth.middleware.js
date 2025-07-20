const jwt = require('jsonwebtoken');
const db = require('../config/db');
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Malformed token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await db.execute('SELECT * FROM User WHERE id = ?', [decoded.userid]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized: Invalid user' });
        }

        const user = rows[0];
        if (user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'İcazəniz yoxdur' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = auth;
