import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";


dotenv.config();

// Secret keys for instructor/admin signup
const INSTRUCTOR_KEY = process.env.INSTRUCTOR_KEY || "instructor-secret";
const ADMIN_KEY = process.env.ADMIN_KEY || "admin-secret";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, secretKey } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Extra security for instructor/admin
    if (role === "instructor") {
      if (!secretKey || secretKey !== INSTRUCTOR_KEY) {
        return res.status(403).json({ message: "Invalid instructor secret key" });
      }
    }

    if (role === "admin") {
      if (!secretKey || secretKey !== ADMIN_KEY) {
        return res.status(403).json({ message: "Invalid admin secret key" });
      }
    }

    // Default to student if role not provided or invalid
    const finalRole = role === "student" || role === "instructor" || role === "admin" ? role : "student";

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, passwordHash, role: finalRole });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({  message: "Signup successful",role: finalRole,token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
