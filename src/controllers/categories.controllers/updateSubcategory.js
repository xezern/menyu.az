const { PrismaClient } = require('@prisma/client');
const { subcategorySchema } = require('../../schema/categories.schema');
const prisma = new PrismaClient();

const updateSubcategory = async (req, res) => {
    const id = +req.params.id;
    const { name_az, name_en, name_ru } = req.body;

    // Validate that the id is provided
    if (!id) return res.status(400).json({ error: "Id mütləq göndərilməlidir!" });

    // Validate the request body against the schema
    try {
        subcategorySchema.parse({ name_az, name_en, name_ru, categoryId: id }); // Pass the body object (in this case, just `name`) to parse
    } catch (validationError) {
        return res.status(400).json({ error: validationError.errors });
    }

    try {
        // Check if the subcategory exists before attempting the update
        const existingSubcategory = await prisma.subcategory.findUnique({
            where: {
                id,
            },
        });

        if (!existingSubcategory) {
            return res.status(404).json({ error: "Subcategory not found." });
        }

        const subCat = await prisma.subcategory.update({
            where: {
                id,
            },
            data: {
                name_az, name_en, name_ru
            }
        });

        res.status(200).json({ message: "Subcategory updated successfully", subCat });
    } catch (error) {
        console.error(error); // Log the error to server logs for debugging
        res.status(500).json({ error: error.message });
    }
};

module.exports = updateSubcategory;
