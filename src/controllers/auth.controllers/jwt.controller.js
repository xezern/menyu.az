const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_SECRET

function generateAccesToken(user) {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1d' });
}

function generateRefreshToken(user) {
    return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

module.exports = {
    generateAccesToken, generateRefreshToken
}