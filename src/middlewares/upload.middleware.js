const multer = require('multer');
const path = require('path');

// Faylların düşəcəyi yer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // uploads qovluğuna yükləyəcək
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname.replaceAll(" ", '')}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
