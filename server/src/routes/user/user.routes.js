import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { updateProfile } from "../../controllers/user.controller.js";

const router = express.Router();

router.put("/profile", authMiddleware, updateProfile);

export default router;
