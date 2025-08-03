const db = require('../../config/db');

const patchCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: "Id mütləq göndərilməlidir!" });

        const { name_az, name_en, name_ru, img, status, order_category } = req.body;

        const [rows] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Category not found" });

        const updatedFields = {};

        if (name_az !== undefined) updatedFields.name_az = name_az;
        if (name_en !== undefined) updatedFields.name_en = name_en;
        if (name_ru !== undefined) updatedFields.name_ru = name_ru;
        if (img !== undefined) updatedFields.img = JSON.stringify(img);
        if (status !== undefined) updatedFields.status = status;
        if (order_category !== undefined) updatedFields.order_category = order_category;

        if (Object.keys(updatedFields).length === 0) return res.status(400).json({ error: "Heç bir sahə yenilənməyib." });

        const updateQuery = 'UPDATE Category SET ' + Object.keys(updatedFields).map(field => `${field} = ?`).join(', ') + ' WHERE id = ?';
        const values = [...Object.values(updatedFields), id];

        await db.execute(updateQuery, values);

        const [updated] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
        res.status(200).json({
            ...updated[0],
            img: JSON.parse(updated[0].img)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = patchCategory;
