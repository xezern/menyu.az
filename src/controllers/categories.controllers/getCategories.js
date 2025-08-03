const db = require('../../config/db');

const getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM Category ORDER BY order_category ASC');
        const [subcategories] = await db.execute('SELECT id, name_az, name_en, name_ru, categoryId FROM Subcategory');

        const formattedCategories = categories.map(category => {
            const relatedSubcategories = subcategories
                .filter(sub => sub.categoryId === category.id)
                .map(subcat => ({
                    ...subcat,
                    slug: `${category.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}/${subcat.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}`.replaceAll("&-", "")
                }));

            return {
                ...category,
                img: JSON.parse(category.img),
                subcategories: relatedSubcategories
            };
        });

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCategories;
