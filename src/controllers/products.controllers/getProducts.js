const db = require('../../config/db');
const { endirim } = require('../../utils/endirim');

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM Product');
    const totalPages = Math.ceil(total / limit);

    const [products] = await db.execute('SELECT * FROM Product LIMIT ? OFFSET ?', [limit, offset]);

    const array = products.map(p => {
      const parsed = {
        ...p,
        img: JSON.parse(p.img),
        ingridients: JSON.parse(p.ingridients),
        sizes: JSON.parse(p.sizes)
      };
      return endirim(parsed);
    });

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
