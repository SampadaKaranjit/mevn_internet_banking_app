import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
