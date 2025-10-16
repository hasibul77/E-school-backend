import express from "express";
import { auth, permit } from "../middleware/authMiddleware.js";
import {
    getCourses,
    getCourse,
    createCourse,
    enrollCourse,
    getEnrolledCourses,
    getEnrolledCourse
} from "../controllers/courseController.js";

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourse); // Course_id

// Protected routes
router.post("/create", auth, permit("instructor", "admin"), createCourse);
router.post("/enroll/:id", auth, permit("student"), enrollCourse); // Course_id

// Enrolled courses routes (for authenticated users)
router.get("/user/enrolled", auth, getEnrolledCourses); // Get all enrolled courses for the user
router.get("/user/enrolled/:id", auth, getEnrolledCourse); // Get specific enrolled course details

export default router;