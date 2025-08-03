const login = require("./login");
const verifyToken = require("./verifyToken");
const register = require('./register');
const resetPassword = require("./resetPassword");
const forgotPassword = require("./forgetPass");
const changePassword = require("./changepass");

module.exports = { login, verifyToken, register, resetPassword, forgotPassword, changePassword };