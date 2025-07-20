const db = require('../../config/db');
const { z } = require('zod');

const getProductByIdSchema = z.object({
    id: z.number()
        .int({ message: 'Product ID must be an integer' })
        .min(1, { message: 'Product ID is required' })
});

const getProductById = async (req, res) => {
    const id = Number(req.params.id);
    const parseResult = getProductByIdSchema.safeParse({ id });

    if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });
    if (!parseResult.success) return res.status(400).json({ errors: parseResult.error.format() });

    try {
        const [products] = await db.execute('SELECT * FROM Product WHERE id = ?', [id]);
        if (products.length === 0) return res.status(404).json({ message: 'Product not found' });

        const product = products[0];

        const [categoryRows] = await db.execute('SELECT * FROM Category WHERE id = ?', [product.categoryId]);
        const [subcategoryRows] = await db.execute('SELECT * FROM Subcategory WHERE id = ?', [product.subcategoryId]);

        const fullProduct = {
            ...product,
            category: categoryRows[0] || null,
            subcategory: subcategoryRows[0] || null,
            img: JSON.parse(product.img),
            ingridients: JSON.parse(product.ingridients),
            sizes: JSON.parse(product.sizes),
            totalPrice: product.discount > 0 ? (product.price * product.discount) / 100 : product.price
        };

        res.status(200).json(fullProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getProductById;
