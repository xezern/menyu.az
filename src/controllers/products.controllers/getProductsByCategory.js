const { PrismaClient } = require('@prisma/client');
const { endirim } = require('../../utils/endirim');
const prisma = new PrismaClient();

const getProductsByCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const totalProducts = await prisma.product.count({
            where: { categoryId: id }
        });

        const totalPages = Math.ceil(totalProducts / limit);

        const products = await prisma.product.findMany({
            where: { categoryId: id },
            skip,
            take: limit,
            include: {
                subcategory: true, 
            }
        });

        if (!products.length) return res.status(404).json({ "error": `Daxil etdiyiniz id (${id}) üzrə məhsullar tapılmadı!` });

        // const allProducts = products.reduce((acc, product) => {
        //     const subcategoryName = product.subcategory.name;

        //     if (!acc[subcategoryName]) {
        //         acc[subcategoryName] = [];
        //     }

        //     acc[subcategoryName].push({
        //         name: product.title_az,
        //         img: product.img,
        //         desc: product.description_az,
        //         price: product.price,
        //         isStock: product.isStok,
        //         status: product.status,
        //     });

        //     return acc;
        // }, {});

        // Qruplaşdırılmış məhsulları uyğun struktura salın
        // const result = Object.keys(allProducts).map(subcategory => ({
        //     title: subcategory,
        //     products: allProducts[subcategory]
        // }));

        // Nəticəyə totalProducts və totalPages əlavə edin
        res.status(200).json({
            products: products,
            page: {
                totalProducts,
                totalPages,
                currentPage: page,
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getProductsByCategory;
