import express from "express";
import {
  createSkiArea,
  getSkiAreas,
  getSkiAreaBySlug,
  togglePublish,
  toggleLike,
  updateSkiArea,
  removeImage,
  deleteSkiArea,
  getLikedSkiAreas
} from "../../controllers/skiArea.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import roleMiddleware from "../../middlewares/role.middleware.js";

const router = express.Router();


router.get("/", authMiddleware, getSkiAreas);
router.get("/skiareas", getSkiAreas);
router.get(
  "/liked",
  authMiddleware,
  getLikedSkiAreas
);
router.get("/:slug", getSkiAreaBySlug);


router.post("/", authMiddleware, roleMiddleware("admin"), createSkiArea);
router.patch(
  "/:id/publish",
  authMiddleware,
  roleMiddleware("admin"),
  togglePublish
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateSkiArea
);


router.post(
  "/:id/remove-image",
  authMiddleware,
  roleMiddleware("admin"),
  removeImage
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteSkiArea
);

router.post("/:id/like", authMiddleware, toggleLike);



export default router;
