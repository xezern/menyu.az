const { PrismaClient } = require('@prisma/client');
const productSchema = require('../../schema/product.schema');
const prisma = new PrismaClient();

const editProduct = async (req, res) => {
    const id = Number(req.params.id);
    let {
        img, name_az, name_en, name_ru, description_az, description_en, description_ru, price, metadata, categoryId, subcategoryId, ingridients, sizes, status, isStok
    } = req.body;

    if (typeof isStok === 'undefined') isStok = true;
    if (typeof status === 'undefined') isCheaps = false;


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
            ingridients, sizes
        });

        if (!parseResult.success) {
            return res.status(400).json({
                errors: parseResult.error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: parseResult.data
        });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Məhsul tapılmadı' });
        }

        res.status(500).json({ error: 'Server xətası baş verdi' });
    }
};

module.exports = editProduct;
