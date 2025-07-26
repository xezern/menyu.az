const db = require('../../config/db');

const getSubcategory = async (req, res) => {
    try {
        const [subcategories] = await db.execute('SELECT * FROM Subcategory');
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getSubcategory;
