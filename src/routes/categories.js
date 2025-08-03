const express = require('express');
const {
    createCategory,
    createSubcategory,
    editCategoriesById,
    getCategories,
    getCategoriesById,
    deleteCategoryById,
    updateSubcategory,
    deleteSubcategory,
    getSubcategory,
    patchCategory
} = require('../controllers/categories.controllers');
const auth = require('../middlewares/auth.middleware');

const validator = require('../middlewares/validation.middleware');
const { categorySchema, subcategorySchema } = require('../schema/categories.schema');
const router = express.Router();

router.post('/', validator(categorySchema), auth, createCategory);
router.get('/', getCategories);
router.get('/subcategories', getSubcategory);
router.get('/:id', getCategoriesById);
router.patch('/:id', auth, patchCategory);
router.put('/:id', validator(categorySchema), auth, editCategoriesById);
router.delete('/:id', auth, deleteCategoryById);

router.post('/subcategory', validator(subcategorySchema), auth, createSubcategory);
router.put('/subcategory/:id', auth, updateSubcategory);
router.delete('/subcategory/:id', auth, deleteSubcategory);

module.exports = router;
