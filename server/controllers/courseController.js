// controllers/courseController.js
import Course from "../models/Course.js";
import User from "../models/User.js";

// 🧠 Get all courses (Public)
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", "name email");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
};

// 📘 Get a single course by ID (Public)
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("instructor", "name email");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching course", error: error.message });
    }
};

// 🧑‍🏫 Create a new course (Instructor/Admin only)
export const createCourse = async (req, res) => {
    try {
        const { title, description, price, imageUrl, lessons } = req.body;

        if (req.user.role !== "instructor" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Only instructors or admins can create courses" });
        }

        const newCourse = await Course.create({
            title,
            description,
            price,
            imageUrl,
            lessons,
            instructor: req.user.userId,
        });

        res.status(201).json({
            message: "Course created successfully",
            course: newCourse,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating course", error: error.message });
    }
};

// 🧑‍🎓 Enroll in a course (Student only)
export const enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const user = await User.findById(req.user.userId);

        if (user.role !== "student") {
            return res.status(403).json({ message: "Only students can enroll in courses" });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: "Enrolled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling course", error: error.message });
    }
};

// 📚 Get user's enrolled courses (Authenticated users)
export const getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate({
            path: 'enrolledCourses',
            populate: {
                path: 'instructor',
                select: 'name email'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Enrolled courses fetched successfully",
            enrolledCourses: user.enrolledCourses
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
    }
};

// 🔍 Get enrolled course details by ID (Authenticated users)
export const getEnrolledCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if user is enrolled in this course
        if (!user.enrolledCourses.includes(courseId)) {
            return res.status(403).json({ message: "You are not enrolled in this course" });
        }

        const course = await Course.findById(courseId).populate("instructor", "name email");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            message: "Enrolled course details fetched successfully",
            course: course
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrolled course", error: error.message });
    }
};