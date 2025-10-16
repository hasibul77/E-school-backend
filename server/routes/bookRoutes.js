import express from "express";
import { auth, permit } from "../middleware/authMiddleware.js";
import { getBooks, createBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", auth, permit("instructor", "admin"), createBook);

export default router;
