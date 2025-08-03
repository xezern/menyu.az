const createCategory = require('./createCategory');
const createSubcategory = require('./createSubcategory');
const editCategoriesById = require('./editCategoriesById');
const getCategories = require('./getCategories');
const getCategoriesById = require('./getCategoriesById');
const deleteCategoryById = require('./deleteCategoryById');
const deleteSubcategory = require('./deleteSubcategory');
const updateSubcategory = require('./updateSubcategory');
const getSubcategory = require('./getSubcategories');
const patchCategory = require('./patchCategory');

module.exports = {
    createCategory,
    createSubcategory,
    editCategoriesById,
    getCategories,
    getCategoriesById,
    deleteCategoryById,
    deleteSubcategory,
    updateSubcategory,
    getSubcategory,
    patchCategory
};

