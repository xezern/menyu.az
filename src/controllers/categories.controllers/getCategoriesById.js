const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getCategoriesById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!id) return res.status(400).json({ error: 'Məhsulun id-si mütləq rəqəm olmalıdır!' });

        const categories = await prisma.category.findMany({
            where: { id: id },
            include: {

                subcategories: {
                    select: {
                        id: true,
                        name_az: true,
                        name_en: true,
                        name_ru: true,
                        products: true
                    }
                }
            }
        });

        const yeniObj = {
            ...categories[0],
            subcategories: categories[0].subcategories.map(item => ({
                ...item,
                slug: `${categories[0].name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}/${item.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}`.replaceAll("&-", "")
            }))
        }

        res.status(200).json(yeniObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getCategoriesById;