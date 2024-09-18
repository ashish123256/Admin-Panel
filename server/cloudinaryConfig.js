import cloudinaryModule from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloudinary = cloudinaryModule.v2; 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Admin-Panel",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

export { storage, cloudinary };
