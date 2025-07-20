const createProduct = require("./createProduct");
const deleteProductById = require("./deleteProductById");
const editProduct = require("./editProduct");
const getProductById = require("./getProductById");
const getProducts = require("./getProducts");
const getProductsByCategory = require("./getProductsByCategory");
const getProductsBySubcategory = require("./getProductsBySubcategory");
const searchProduct = require("./searchProduct");
const getAllProductsByCategory = require('./getAllProductsByCategory')

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    editProduct,
    deleteProductById,
    searchProduct,
    getProductsByCategory,
    getProductsBySubcategory,
    getAllProductsByCategory
};
