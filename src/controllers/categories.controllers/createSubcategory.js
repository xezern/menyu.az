const db = require('../../config/db');
const { subcategorySchema } = require('../../schema/categories.schema');

const createSubcategory = async (req, res) => {
  const parseResult = subcategorySchema.safeParse({
    ...req.body,
    categoryId: Number(req.body.categoryId),
  });

  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult });
  }

  try {
    const { name_az, name_en, name_ru, categoryId } = parseResult.data;

    const [catRows] = await db.execute('SELECT id FROM Category WHERE id = ?', [categoryId]);
    if (catRows.length === 0) {
      return res.status(400).json({ error: "Göndərilən categoryId bazada mövcud deyil!" });
    }

    const [result] = await db.execute(
      'INSERT INTO Subcategory (name_az, name_en, name_ru, categoryId) VALUES (?, ?, ?, ?)',
      [name_az, name_en || null, name_ru || null, categoryId]
    );

    const subcategory = {
      id: result.insertId,
      name_az,
      name_en,
      name_ru,
      categoryId,
    };

    res.status(201).json({ message: "subcategory created has succesefuly alla sene sukur", subcategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createSubcategory;
