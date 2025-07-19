const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const productSchema = require('../../schema/product.schema');
const prisma = new PrismaClient();


const createProduct = async (req, res) => {
    const parseResult = productSchema.safeParse({
        ...req.body,
        price: parseFloat(req.body.price),
        categoryId: parseInt(req.body.categoryId),
        subcategoryId: parseInt(req.body.subcategoryId)
    });

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }

    try {
        const {
            img, name_az, name_en, name_ru, description_az, description_en, description_ru, price, metadata, categoryId, subcategoryId, category, subcategory, ingridients, sizes, status, isStok } = parseResult.data;

        const isCategory = await prisma.category.findUnique({
            where: { id: categoryId }
        });
        const isSubcategory = await prisma.subcategory.findUnique({
            where: { id: subcategoryId }
        });

        if (!isCategory || !isSubcategory) {
            return res.status(400).json({ error: 'Kateqoriya və ya alt kateqoriya mövcud deyil' });
        }

        const product = await prisma.product.create({
            data: {
                img,
                name_az,
                name_en,
                name_ru,
                description_az,
                description_en,
                description_ru,
                price,
                metadata,
                categoryId,
                subcategoryId,
                ingridients,
                sizes,
                status,
                isStok
            }
        });

        res.status(201).json({ status: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createProduct;
