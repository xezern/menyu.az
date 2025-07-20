function createImg(req, res) {
    if (req.file.fieldname !== 'img') {
        res.status(400).json({
            message: `Sizden gözlənilən field name: "img", Sizin göndərdiyiniz filed name: ${req.file.fieldname} `,
        });
        return
    }

    try {
        const filePath = `/uploads/${req.file.filename.replaceAll(" ", '')}`;
        res.status(201).json({
            message: 'Şəkil uğurla yükləndi',
            file: {
                originalName: req.file.originalname,
                fileName: req.file.filename,
                mimeType: req.file.mimetype,
                size: req.file.size,
                path: filePath
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.errors ? err.errors : 'Internal Server Error',
        });
    }
}

module.exports = createImg;
