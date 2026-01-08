import express from "express";
import {
  createComment,
  getCommentsBySkiArea,
  getReplies,
  toggleLike,
  deleteComment,
  getAllComments,
  getCommentCount,
  getMyComments
} from "../../controllers/comment.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const router = express.Router();

/* ---------- Public ---------- */
router.get("/ski-area/:skiAreaId", getCommentsBySkiArea);
router.get("/replies/:commentId", getReplies);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getAllComments
);

router.get(
  "/admin/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getCommentCount
);

router.post(
  "/:id/reply",
  authMiddleware,
  roleMiddleware("admin"),
  createComment
);


router.post("/", authMiddleware, createComment);
router.post("/:id/like", authMiddleware, toggleLike);
router.delete("/:id", authMiddleware, deleteComment);
router.get("/my", authMiddleware, getMyComments);


export default router;
