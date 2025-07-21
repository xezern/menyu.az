const db = require('../../config/db');
const { z } = require('zod');
const fs = require('fs');
const path = require('path');

const deleteCategoryByIdSchema = z.object({
  id: z.number()
    .int({ message: 'Category ID must be an integer' })
    .min(1, { message: 'Category ID is required' }),
});

const deleteCategoryById = async (req, res) => {
  const parseResult = deleteCategoryByIdSchema.safeParse({ id: Number(req.params.id) });

  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult });
  }

  try {
    const { id } = parseResult.data;

    const [rows] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = rows[0];
    const imgs = JSON.parse(category.img);

    if (imgs && imgs.length > 0) {
      for (const imageUrl of imgs) {
        const filename = imageUrl.split('/').pop();
        const filePath = path.join(__dirname, '..', '..', '..', 'uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await db.execute('DELETE FROM Category WHERE id = ?', [id]);

    res.status(200).json({
      deletecat: { ...category, img: JSON.parse(category.img) },
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategoryById;
