const db = require('../../config/db');

const getCategoriesById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });

        const [categories] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
        if (categories.length === 0) return res.status(404).json({ error: 'Category tapılmadı' });

        const category = categories[0];

        const [subcategories] = await db.execute(
            'SELECT * FROM Subcategory WHERE categoryId = ?',
            [category.id]
        );
        const [products] = await db.execute('SELECT * FROM Product WHERE categoryId = ?', [category.id]);

        const subcategoriesWithProducts = subcategories.map(sub => {
            const relatedProducts = products.filter(p => p.subcategoryId === sub.id);
            return {
                ...sub,
                products: relatedProducts,
                slug: `${category.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}/${sub.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}`.replaceAll("&-", "")
            };
        });

        const yeniObj = {
            ...category,
            img: JSON.parse(category.img),
            subcategories: subcategoriesWithProducts
        };

        res.status(200).json(yeniObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCategoriesById;
