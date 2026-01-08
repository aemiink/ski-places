import express from "express";
import authRoutes from "./auth/index.js";
import skiAreaRoutes from "./skiAreas/index.js";
import commentRoutes from "./comments/index.js";
import uploadRoutes from "./upload/index.js";
import UserRoutes from "./user/index.js";




const router = express.Router();

router.use("/auth", authRoutes);
router.use("/ski-areas", skiAreaRoutes);
router.use("/comments", commentRoutes);
router.use("/upload", uploadRoutes);
router.use("/user", UserRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API routes working 🚀"
  });
});

export default router;
