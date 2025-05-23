import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';
import multer from 'multer';

const storage = new CloudinaryStorage({
    cloudinary,
    params: () => ({
        folder: 'feeds',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    }),
});

const upload = multer({ storage });

export default upload;