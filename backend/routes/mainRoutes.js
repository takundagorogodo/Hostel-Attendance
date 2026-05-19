import express from "express";

import { verifyToken, requireAdmin, requireWarden, requireStaff } from "../middlewares/authMiddleware.js";
import { createWarden, deleteWardenByAdmin, updateWardenByAdmin, updateAdmin, updateWardenByWarden } from "../controllers/userController.js";
import { addStudent, deleteStudent, changeRoom, transferStudent } from "../controllers/studentController.js";
import { markAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

// ─── Admin: Warden Management ─────────────────────────────────────────────────

router.post  ("/wardens",          verifyToken, requireAdmin,  createWarden);
router.delete("/wardens/:id",      verifyToken, requireAdmin,  deleteWardenByAdmin);
router.patch ("/wardens/:id",      verifyToken, requireAdmin,  updateWardenByAdmin);

// ─── Admin: Self ──────────────────────────────────────────────────────────────

router.patch ("/admin/me",         verifyToken, requireAdmin,  updateAdmin);

// ─── Admin: Student Management ───────────────────────────────────────────────

router.post  ("/students",         verifyToken, requireStaff,  addStudent);
router.delete("/students/:id",     verifyToken, requireAdmin,  deleteStudent);
router.patch ("/students/:id/room",verifyToken, requireAdmin,  changeRoom);
router.patch ("/students/:id/transfer", verifyToken, requireAdmin, transferStudent);

// ─── Warden: Self ────────────────────────────────────────────────────────────

router.patch ("/warden/me",        verifyToken, requireWarden, updateWardenByWarden);

// ─── Shared: Attendance ───────────────────────────────────────────────────────

router.post  ("/attendance/:id",   verifyToken, requireStaff,  markAttendance);

export default router;