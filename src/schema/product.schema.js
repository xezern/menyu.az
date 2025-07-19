const { z } = require("zod");

const productSchema = z.object({
    img: z.array(z.string().url({ message: 'Şəklin URL formatı yanlışdır' })).nonempty({ message: 'Ən azı bir şəkil URL-si lazımdır' }),
    name_az: z.string()
        .min(3, { message: 'Məhsulun adı ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun adı 255 simvoldan az olmalıdır' })
        .trim()
        .nonempty({ message: 'Məhsulun adı lazımdır' }),
    name_en: z.string()
        .min(3, { message: 'Məhsulun adı ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun adı 255 simvoldan az olmalıdır' })
        .trim()
        .nonempty({ message: 'Məhsulun adı lazımdır' }),
    name_ru: z.string()
        .min(3, { message: 'Məhsulun adı ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun adı 255 simvoldan az olmalıdır' })
        .trim()
        .nonempty({ message: 'Məhsulun adı lazımdır' }),
    description_az: z.string()
        .min(3, { message: 'Məhsulun təsviri ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun təsviri 255 simvoldan az olmalıdır' })
        .trim(),
    description_ru: z.string()
        .min(3, { message: 'Məhsulun təsviri ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun təsviri 255 simvoldan az olmalıdır' })
        .trim(),
    description_en: z.string()
        .min(3, { message: 'Məhsulun təsviri ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun təsviri 255 simvoldan az olmalıdır' })
        .trim(),
    price: z.number()
        .positive({ message: 'Qiymət müsbət rəqəm olmalıdır' })
        .min(0.01, { message: 'Qiymət ən azı 0.01 olmalıdır' }),
    categoryId: z.number()
        .int({ message: 'Kateqoriya ID tam ədəd olmalıdır' })
        .positive({ message: 'Kateqoriya ID müsbət tam ədəd olmalıdır' }),
    subcategoryId: z.number()
        .int({ message: 'Alt kateqoriya ID tam ədəd olmalıdır' })
        .positive({ message: 'Alt kateqoriya ID müsbət tam ədəd olmalıdır' }),
    metadata: z.string()
        .min(3, { message: 'Məhsulun meta məlumatları ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun meta məlumatları 255 simvoldan az olmalıdır' })
        .trim()
        .optional(),
    ingridients: z.array(z.string()
        .min(3, { message: 'Məhsulun meta məlumatları ən azı 3 simvol olmalıdır' })
        .max(255, { message: 'Məhsulun meta məlumatları 255 simvoldan az olmalıdır' })
        .trim()
        .optional()),
    sizes: z.array(z.string()).optional(),
    status: z.boolean().optional(),
    isStok: z.boolean().optional(),
});


module.exports = productSchema;