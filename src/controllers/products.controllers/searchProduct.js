const db = require('../../config/db');
const { z } = require('zod');

const querySchema = z.object({
  name: z.string()
    .min(2, { message: 'Product name must be at least 2 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
});

const searchProduct = async (req, res) => {
  const yoxla = querySchema.safeParse(req.query);
  if (!yoxla.success) {
    return res.status(400).json({ errors: yoxla.error.format().name._errors[0] });
  }

  try {
    const { name } = req.query;
    const [products] = await db.execute(
      'SELECT * FROM Product WHERE name_az LIKE ? OR name_en LIKE ? OR name_ru LIKE ?',
      [`%${name}%`, `%${name}%`, `%${name}%`]
    );

    const array = products.map(p => ({
      ...p,
      img: JSON.parse(p.img),
      ingridients: JSON.parse(p.ingridients),
      sizes: JSON.parse(p.sizes)
    }));

    res.status(200).json({
      products: array,
      totalProducts: array.length,
      totalPages: null,
      currentPage: null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchProduct;
