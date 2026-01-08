import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config({ path: "../../.env" });

const createAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ski_places_db"
    });

    console.log("✅ MongoDB connected");

    const adminEmail = "ridvan@admin.com";


    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }


    const admin = await User.create({
      username: "rıdvan_admin",
      email: adminEmail,
      password: "rıdvan123",
      role: "admin"
    });

    console.log("🎉 Admin created successfully");
    console.log({
      email: admin.email,
      password: "ridvan123"
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
