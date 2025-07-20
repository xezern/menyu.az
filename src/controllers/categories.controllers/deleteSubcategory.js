const db = require('../../config/db');

const deleteSubcategory = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Id mütləq göndərilməlidir!" });

    try {
        const [rows] = await db.execute('SELECT * FROM Subcategory WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }

        await db.execute('DELETE FROM Subcategory WHERE id = ?', [id]);

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteSubcategory;
