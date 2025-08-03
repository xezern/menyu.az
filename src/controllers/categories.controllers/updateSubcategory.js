const db = require('../../config/db');
const { subcategorySchema } = require('../../schema/categories.schema');

const updateSubcategory = async (req, res) => {
    const id = +req.params.id;
    const { name_az, name_en, name_ru, status } = req.body;

    if (!id) return res.status(400).json({ error: "Id mütləq göndərilməlidir!" });

    try {
        subcategorySchema.parse({ name_az, name_en, name_ru, categoryId: id });
    } catch (validationError) {
        return res.status(400).json({ error: validationError.errors });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM Subcategory WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Subcategory not found." });
        }

        const currentStatus = status !== undefined ? status : rows[0].status;

        await db.execute(
            'UPDATE Subcategory SET name_az = ?, name_en = ?, name_ru = ? , status = ? WHERE id = ?',
            [name_az, name_en || null, name_ru || null, currentStatus, id]
        );

        const [updated] = await db.execute('SELECT * FROM Subcategory WHERE id = ?', [id]);

        res.status(200).json({ message: "Subcategory updated successfully", subCat: updated[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateSubcategory;
