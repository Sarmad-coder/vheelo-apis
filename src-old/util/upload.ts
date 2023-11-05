import multer from "multer";
import CLOUDINARY from "cloudinary";
const cloudinary = CLOUDINARY.v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";


// Configuration
cloudinary.config({
    cloud_name: "dpxo0k5hb",
    api_key: "698127623914963",
    api_secret: "NwVQjCYqEBccFxpfRhJJzpg8G-I"
});

const folder = "uploads";

const parameters = {
    cloudinary: cloudinary,
    params: {
        folder,
        format: async (req, file) => 'png', // You can change the file format here.
        public_id: function (req, file) {
            const newFileName2 = `${Date.now()}-${file.originalname}`;
            return newFileName2;
        }
    }
}

const storage = new CloudinaryStorage(parameters);


export const upload = multer({
    storage: storage
});

