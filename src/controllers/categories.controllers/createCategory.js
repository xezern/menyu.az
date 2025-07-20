const db = require('../../config/db'); // Nəzərə alındı
const { categorySchema } = require('../../schema/categories.schema');

const createCategory = async (req, res) => {
  const parseResult = categorySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ validation_errors: parseResult });
  }

  try {
    const { name_az, name_en, name_ru, img } = parseResult.data;

    const [result] = await db.execute(
      'INSERT INTO Category (name_az, name_en, name_ru, img) VALUES (?, ?, ?, ?)',
      [name_az, name_en, name_ru, JSON.stringify(img)]
    );

    const newCategory = {
      id: result.insertId,
      name_az,
      name_en,
      name_ru,
      img,
    };

    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = createCategory;
