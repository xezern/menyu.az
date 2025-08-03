const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM User WHERE resetToken = ? AND resetTokenExpires > NOW()',
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const user = rows[0];
    const hashed = await bcrypt.hash(newPassword, 10);

    await db.execute(
      'UPDATE User SET password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE id = ?',
      [hashed, user.id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = resetPassword;
