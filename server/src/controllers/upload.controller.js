import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const result = cloudinary.uploader.upload_stream(
      {
        folder: "ski-places",
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          return next(error);
        }

        res.status(200).json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};
