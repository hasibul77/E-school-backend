import express from "express";
import { auth, permit } from "../middleware/authMiddleware.js";
import {
  getCourses,
  getCourse,
  createCourse,
  enrollCourse
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourse); //Course_id
router.post("/create", auth, permit("instructor", "admin"), createCourse);
router.post("/enroll/:id", auth, permit("student"), enrollCourse); //ourse_id

export default router;
