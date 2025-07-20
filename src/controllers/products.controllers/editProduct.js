const db = require('../../config/db');
const productSchema = require('../../schema/product.schema');

const editProduct = async (req, res) => {
    const id = Number(req.params.id);
    let {
        img, name_az, name_en, name_ru, description_az, description_en,
        description_ru, price, metadata, categoryId, subcategoryId,
        ingridients, sizes, status, isStok
    } = req.body;

    if (typeof isStok === 'undefined') isStok = true;
    if (typeof status === 'undefined') status = false;

    try {
        const parseResult = productSchema.safeParse({
            img,
            name_az, name_en, name_ru,
            price: Number(price),
            categoryId: Number(categoryId),
            subcategoryId: Number(subcategoryId),
            description_az, description_en, description_ru,
            metadata,
            isStok,
            ingridients,
            sizes,
            status
        });

        if (!parseResult.success) {
            return res.status(400).json({
                errors: parseResult.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const [exist] = await db.execute('SELECT * FROM Product WHERE id = ?', [id]);
        if (exist.length === 0) {
            return res.status(404).json({ error: 'Məhsul tapılmadı' });
        }

        const data = parseResult.data;

        await db.execute(
            `UPDATE Product SET
                img = ?, name_az = ?, name_en = ?, name_ru = ?, 
                description_az = ?, description_en = ?, description_ru = ?, 
                price = ?, metadata = ?, categoryId = ?, subcategoryId = ?, 
                ingridients = ?, sizes = ?, status = ?, isStok = ?
             WHERE id = ?`,
            [
                JSON.stringify(data.img),
                data.name_az,
                data.name_en || null,
                data.name_ru || null,
                data.description_az,
                data.description_en || null,
                data.description_ru || null,
                data.price,
                data.metadata || null,
                data.categoryId,
                data.subcategoryId,
                JSON.stringify(data.ingridients),
                JSON.stringify(data.sizes),
                data.status,
                data.isStok,
                id
            ]
        );

        const [updatedRows] = await db.execute('SELECT * FROM Product WHERE id = ?', [id]);
        const updatedProduct = updatedRows[0];
        updatedProduct.img = JSON.parse(updatedProduct.img);
        updatedProduct.ingridients = JSON.parse(updatedProduct.ingridients);
        updatedProduct.sizes = JSON.parse(updatedProduct.sizes);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server xətası baş verdi' });
    }
};

module.exports = editProduct;
