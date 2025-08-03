const db = require('../../config/db');

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const { categoryId, subcategoryId } = req.query;

    let whereClause = '';
    const whereParams = [];

    if (categoryId) {
      whereClause += 'categoryId = ? ';
      whereParams.push(categoryId);
    }

    if (subcategoryId) {
      whereClause += (whereClause ? 'AND ' : '') + 'subcategoryId = ? ';
      whereParams.push(subcategoryId);
    }

    const whereSQL = whereClause ? `WHERE ${whereClause}` : '';

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM Product ${whereSQL}`,
      whereParams
    );

    const totalPages = Math.ceil(total / limit);

    const [products] = await db.execute(
      `SELECT * FROM Product ${whereSQL} ORDER BY id DESC LIMIT ? OFFSET ?`,
      [...whereParams, limit, offset]
    );

    const array = products.map(p => ({
      ...p,
      price: Number(p.price.toFixed(2)),
      img: JSON.parse(p.img),
      ingridients: JSON.parse(p.ingridients),
      sizes: JSON.parse(p.sizes)
    }));

    res.status(200).json({
      products: array,
      page: {
        totalProducts: total,
        totalPages,
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
