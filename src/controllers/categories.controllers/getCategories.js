const db = require('../../config/db');

const getCategories = async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM Category ORDER BY id ASC');

        const formattedCategories = categories.map(category => ({
            ...category,
            img: JSON.parse(category.img)
        }));

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCategories;
