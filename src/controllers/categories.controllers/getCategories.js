const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subcategories: {
                    select: {
                        id: true,
                        name_az: true,
                        name_en: true,
                        name_ru: true
                    }
                }
            }
        });

        const formattedCategories = categories.map(category => ({
            ...category,
            subcategories: category.subcategories.map(subcat => ({
                ...subcat,
                slug: `${category.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}/${subcat.name_en.toLocaleLowerCase("tr-Tr").split(" ").join("-")}`.replaceAll("&-", "")
            })
            )
        }))

        res.status(200).json(formattedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = getCategories;