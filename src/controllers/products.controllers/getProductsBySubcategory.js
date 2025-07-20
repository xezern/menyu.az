const db = require('../../config/db');

const getProductsBySubcategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM Product WHERE subcategoryId = ?', [id]);
        const totalPages = Math.ceil(total / limit);

        const [products] = await db.execute(
            'SELECT * FROM Product WHERE subcategoryId = ? LIMIT ? OFFSET ?',
            [id, limit, offset]
        );

        if (products.length === 0) {
            return res.status(404).json({ error: `Daxil etdiyiniz id (${id}) üzrə məhsullar tapılmadı!` });
        }

        const array = products.map(p => ({
            ...p,
            img: JSON.parse(p.img),
            ingridients: JSON.parse(p.ingridients),
            sizes: JSON.parse(p.sizes)
        }));

        res.status(200).json({
            products: array,
            totalProducts: total,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getProductsBySubcategory;
