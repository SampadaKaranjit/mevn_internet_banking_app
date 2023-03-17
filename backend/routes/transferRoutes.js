import express from "express";
const router = express.Router();
import {
  getTransfers,
  getTransferById,
  createTransfer,
} from "../controllers/transferController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getTransfers)
  .post(protect, admin, createTransfer);
router.route("/:id").get(protect, admin, getTransferById);

export default router;
