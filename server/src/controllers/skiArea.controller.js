import SkiArea from "../models/SkiArea.model.js";
import cloudinary from "../config/cloudinary.js";
import Comment from "../models/Comment.model.js";

export const createSkiArea = async (req, res) => {
  try {
    const { title, description, images, location, season } = req.body;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated"
      });
    }

    if (!title || !description || !location || !season) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const skiArea = await SkiArea.create({
      title,
      description,
      images,
      location,
      season,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      data: skiArea
    });
  } catch (error) {
    console.error("CREATE SKIAREA ERROR:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: Object.values(error.errors)[0].message
      });
    }

    res.status(500).json({
      message: "SkiArea could not be created"
    });
  }
};

export const getSkiAreas = async (req, res) => {
  try {
    const filter =
      req.user?.role === "admin"
        ? {}
        : { isPublished: true };

    const skiAreas = await SkiArea.find(filter)
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: skiAreas.length,
      data: skiAreas
    });
  } catch (error) {
    console.error("GET SKIAREAS ERROR:", error);
    res.status(500).json({
      message: "SkiAreas could not be fetched"
    });
  }
};

export const getSkiAreaBySlug = async (req, res) => {
  try {
    const skiArea = await SkiArea.findOne({
      slug: req.params.slug,
      isPublished: true
    }).populate("author", "username");

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    res.status(200).json({
      success: true,
      data: skiArea
    });
  } catch (error) {
    console.error("GET SKIAREA ERROR:", error);
    res.status(500).json({
      message: "SkiArea could not be fetched"
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const skiArea = await SkiArea.findById(req.params.id);

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    skiArea.isPublished = !skiArea.isPublished;
    await skiArea.save();

    res.status(200).json({
      success: true,
      isPublished: skiArea.isPublished
    });
  } catch (error) {
    console.error("TOGGLE PUBLISH ERROR:", error);
    res.status(500).json({
      message: "Publish toggle failed"
    });
  }
};

export const deleteSkiArea = async (req, res) => {
  try {
    const skiArea = await SkiArea.findById(req.params.id);

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    for (const image of skiArea.images) {
      try {
        await cloudinary.uploader.destroy(image.publicId || image);
      } catch (err) {
        console.warn("Cloudinary delete failed:", err.message);
      }
    }

    await Comment.deleteMany({ skiArea: skiArea._id });

    await skiArea.deleteOne();

    res.status(200).json({
      success: true,
      message: "Ski area and related comments deleted"
    });
  } catch (error) {
    console.error("DELETE SKIAREA ERROR:", error);
    res.status(500).json({
      message: "SkiArea could not be deleted"
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const skiArea = await SkiArea.findById(req.params.id);

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    const userId = req.user._id.toString();

    const liked = skiArea.likes.some(
      (id) => id.toString() === userId
    );

    if (liked) {
      skiArea.likes = skiArea.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      skiArea.likes.push(userId);
    }

    await skiArea.save();

    res.status(200).json({
      success: true,
      likesCount: skiArea.likes.length,
      liked: !liked
    });
  } catch (error) {
    console.error("LIKE ERROR:", error);
    res.status(500).json({
      message: "Like operation failed"
    });
  }
};

export const updateSkiArea = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      season,
      isPublished,
      images
    } = req.body;


    const skiArea = await SkiArea.findById(req.params.id);

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    if (title) skiArea.title = title;
    if (description) skiArea.description = description;
    if (location !== undefined) skiArea.location = location;
    if (season !== undefined) skiArea.season = season;

    if (typeof isPublished === "boolean") {
      skiArea.isPublished = isPublished;
    }

    if (Array.isArray(images)) {
      skiArea.images = images;
    }

    await skiArea.save();

    res.status(200).json({
      success: true,
      data: skiArea
    });
  } catch (error) {
    console.error("UPDATE SKIAREA ERROR:", error);
    res.status(500).json({
      message: "SkiArea could not be updated"
    });
  }
};



export const removeImage = async (req, res) => {
  try {
    const { imageUrl, publicId } = req.body;

    const skiArea = await SkiArea.findById(req.params.id);

    if (!skiArea) {
      return res.status(404).json({
        message: "Ski area not found"
      });
    }

    skiArea.images = skiArea.images.filter(
      (img) => img !== imageUrl
    );

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await skiArea.save();

    res.status(200).json({
      success: true,
      images: skiArea.images
    });
  } catch (error) {
    console.error("REMOVE IMAGE ERROR:", error);
    res.status(500).json({
      message: "Image could not be removed"
    });
  }
};

export const getLikedSkiAreas = async (req, res) => {
  try {
    const userId = req.user._id;

    const skiAreas = await SkiArea.find({
      likes: userId,
      isPublished: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: skiAreas.length,
      data: skiAreas
    });
  } catch (error) {
    console.error("GET LIKED SKIAREAS ERROR:", error);
    res.status(500).json({
      message: "Liked ski areas could not be fetched"
    });
  }
};

