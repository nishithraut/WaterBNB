// Import the Cloudinary library and access its v2 API
// Cloudinary is a cloud-based service for image and video storage, transformation, and delivery.
const cloudinary = require('cloudinary').v2;

// Import the Cloudinary storage engine for Multer
// Multer is a middleware for handling file uploads in Node.js, and multer-storage-cloudinary allows storing files directly in Cloudinary.
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with credentials stored in environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,      // The unique name of the Cloudinary account, used to identify the storage space.
    api_key: process.env.CLOUD_API_KEY,      // The API key provided by Cloudinary, required for authentication.
    api_secret: process.env.CLOUD_API_SECRET // The API secret, used for secure communication with Cloudinary.
});

/*
🔹 Why is this used?
- Cloudinary is used for efficient image and video management in cloud storage.
- Multer-storage-cloudinary simplifies the process of uploading files from a Node.js application to Cloudinary.
- Using environment variables ensures sensitive credentials are not exposed in the codebase, improving security.
*/


// Create an instance of CloudinaryStorage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,  // Reference to the configured Cloudinary instance

    params: { 
      folder: 'wanderlust_DEV',  // The name of the folder where uploaded files will be stored in Cloudinary

      allowedFormats: ["jpg", "jpeg", "png"], // Specifies the allowed file formats for uploads
    },
});


module.exports = {
    cloudinary,
    storage
}