import mongoose from "mongoose";
import dotenv from "dotenv";
import Comment from "../models/Comment.model.js";
import User from "../models/User.model.js";
import SkiArea from "../models/SkiArea.model.js";

dotenv.config({ path: "../../.env" });

const createFakeComments = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ski_places_db"
    });

    console.log("✅ MongoDB connected");


    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.log("❌ Admin not found");
      process.exit(1);
    }


    const user =
      (await User.findOne({ role: "user" })) || admin;


    const skiArea = await SkiArea.findOne();
    if (!skiArea) {
      console.log("❌ SkiArea not found");
      process.exit(1);
    }


    const comments = [
      {
        text: "Harika bir kayak merkezi, pistler çok iyiydi!",
        user: user._id,
        skiArea: skiArea._id
      },
      {
        text: "Manzara efsane ama hafta sonu kalabalık oluyor.",
        user: user._id,
        skiArea: skiArea._id
      }
    ];

    const createdComments = await Comment.insertMany(comments);


    await Comment.create({
      text: "Geri bildiriminiz için teşekkür ederiz 🙌",
      user: admin._id,
      skiArea: skiArea._id,
      parentComment: createdComments[0]._id
    });

    console.log("🎉 Fake comments created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating fake comments:", error.message);
    process.exit(1);
  }
};

createFakeComments();
