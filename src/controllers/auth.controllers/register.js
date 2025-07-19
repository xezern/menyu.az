const jwt = require('jsonwebtoken'); // jwt kitabxanasını daxil edin
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ "error": "'username' ve ya 'password' parametrleri gonderilmeyib" });

        const existingUser = await prisma.user.findUnique({
            where: { username: username },
        });

        if (existingUser) {
            return res.status(400).json({ "error": "Bu istifadəçi adı artıq mövcuddur." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: "ADMIN"
            }
        });

        // Tokenləri yaradırıq
        const token = jwt.sign({ userid: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });  
        const refresh = jwt.sign({ userid: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ token, refresh, username: newUser.username, role: newUser.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = register;
