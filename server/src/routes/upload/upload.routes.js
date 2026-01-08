import express from "express";
import upload from "../../middlewares/upload.middleware.js";
import { uploadImage } from "../../controllers/upload.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  uploadImage
);

export default router;
