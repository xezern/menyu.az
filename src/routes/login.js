
const express = require('express');
const router = express.Router();

const { login, verifyToken, register } = require('../controllers/auth.controllers');
const auth = require('../middlewares/auth.middleware');
const validator = require('../middlewares/validation.middleware');

const authSchema = require('../schema/auth.schema');
router.post('/register', register);
router.post('/login', validator(authSchema), login);
router.get('/verify-token', auth, verifyToken);
module.exports = router;
