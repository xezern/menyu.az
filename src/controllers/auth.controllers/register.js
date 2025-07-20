const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../config/db'); // mysql2 bağlantısı

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "'username' və ya 'password' göndərilməyib" });
    }

    // User mövcuddurmu?
    const [users] = await db.execute(
      'SELECT * FROM User WHERE username = ?',
      [username]
    );

    if (users.length > 0) {
      return res.status(400).json({ error: 'Bu istifadəçi adı artıq mövcuddur.' });
    }

    // Şifrəni hashlə
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni user yarad
    const [result] = await db.execute(
      'INSERT INTO User (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, 'ADMIN']
    );

    const newUserId = result.insertId;

    // Tokenlər
    const token = jwt.sign({ userid: newUserId, role: 'ADMIN' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refresh = jwt.sign({ userid: newUserId, role: 'ADMIN' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      refresh,
      username,
      role: 'ADMIN'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server xətası' });
  }
};

module.exports = register;
