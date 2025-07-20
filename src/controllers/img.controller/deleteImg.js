const fs = require('fs');
const path = require('path');

const deleteImage = async (req, res) => {
    const { filename } = req.params;

    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', filename); 

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
            return res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            return res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({ error: 'Failed to delete image' });
    }
};

module.exports = deleteImage;
