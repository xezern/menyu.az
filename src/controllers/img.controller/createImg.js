const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

function createImg(req, res) {
    if (req.file.fieldname !== 'img') {
        res.status(400).json({
            message: `Sizden gözlənilən field name: "img", Sizin göndərdiyiniz filed name: ${req.file.fieldname} `,
        });
        return;
    }

    try {
        // Şəkilin orijinal yeri
        const inputPath = path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename);

        // Şəkilin optimallaşdırılmış yeri
        const optimizedFileName = `${Date.now()}-${req.file.filename.replaceAll(" ", '')}`;
        const outputPath = path.join(__dirname, '..', '..', '..', 'uploads', optimizedFileName);

        // Şəkli optimallaşdırırıq
        sharp(inputPath)
            .resize(800) // Maksimum 800px genişlik
            .jpeg({ quality: 90 }) // JPEG formatında keyfiyyətini 80 edir
            .toFile(outputPath, (err, info) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Şəkil optimallaşdırıla bilmədi',
                    });
                }

                fs.unlinkSync(inputPath);

                // Optimallaşdırılmış şəkilin serverə saxlanılması
                res.status(201).json({
                    message: 'Şəkil uğurla yükləndi və optimallaşdırıldı',
                    file: {
                        originalName: req.file.originalname,
                        fileName: optimizedFileName,
                        mimeType: req.file.mimetype,
                        size: info.size,
                        path: `/uploads/${optimizedFileName}`
                    }
                });
            });
    } catch (err) {
        console.log(err);
        
        res.status(500).json({
            message: err.errors ? err.errors : 'Internal Server Error',
        });
    }
}

module.exports = createImg