const express = require('express');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const createImg = require('../controllers/img.controller/createImg');
const deleteImage = require('../controllers/img.controller/deleteImg');
const router = express.Router();

router.post('/', auth, upload.single('img'), createImg);
router.delete('/:filename', auth, deleteImage);

module.exports = router;
