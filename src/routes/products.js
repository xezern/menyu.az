const express = require('express');
const router = express.Router();

const { createProduct, getProducts, getProductById, editProduct, deleteProductById, searchProduct, getAllProductsByCategory } = require('../controllers/products.controllers');

const auth = require('../middlewares/auth.middleware');

router.get('/', getProducts);
router.post('/', auth, createProduct);

router.get('/search', searchProduct);

router.get('/category/:id', getAllProductsByCategory);

router.get('/:id', getProductById);
router.put('/:id', auth, editProduct);
router.delete('/:id', auth, deleteProductById);


module.exports = router;
