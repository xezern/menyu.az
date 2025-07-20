const db = require('../../config/db');
const { z } = require('zod');
const productSchema = require('../../schema/product.schema');

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
            img, name_az, name_en, name_ru, description_az,
            description_en, description_ru, price, metadata,
            categoryId, subcategoryId, ingridients, sizes, status, isStok
        } = parseResult.data;

        const [cat] = await db.execute('SELECT id FROM Category WHERE id = ?', [categoryId]);
        const [subcat] = await db.execute('SELECT id FROM Subcategory WHERE id = ?', [subcategoryId]);

        if (cat.length === 0 || subcat.length === 0) {
            return res.status(400).json({ error: 'Kateqoriya və ya alt kateqoriya mövcud deyil' });
        }

        const [result] = await db.execute(
            `INSERT INTO Product (
                img, name_az, name_en, name_ru, description_az,
                description_en, description_ru, price, metadata,
                categoryId, subcategoryId, ingridients, sizes, status, isStok
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                JSON.stringify(img),
                name_az,
                name_en || null,
                name_ru || null,
                description_az,
                description_en || null,
                description_ru || null,
                price,
                metadata || null,
                categoryId,
                subcategoryId,
                JSON.stringify(ingridients),
                JSON.stringify(sizes),
                status ?? true,
                isStok ?? true
            ]
        );

        const product = {
            id: result.insertId,
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
        };

        res.status(201).json({ status: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createProduct;
