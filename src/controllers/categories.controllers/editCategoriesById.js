const db = require('../../config/db');

const editCategoriesById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Id mütləq göndərilməlidir!" });

        const { name_az, name_en, name_ru, img } = req.body;

        const [rows] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }

        await db.execute(
            'UPDATE Category SET name_az = ?, name_en = ?, name_ru = ?, img = ? WHERE id = ?',
            [name_az, name_en, name_ru, JSON.stringify(img), id]
        );

        const [updated] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);

        res.status(200).json({
            ...updated[0],
            img: JSON.parse(updated[0].img)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = editCategoriesById;
