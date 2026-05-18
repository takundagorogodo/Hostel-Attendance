import { verifyToken, requireAdmin, requireWarden, requireStaff } from "./middleware/authMiddleware.js";

// Admin only
router.post("/wardens",         verifyToken, requireAdmin,  createWarden);
router.delete("/wardens/:id",   verifyToken, requireAdmin,  deleteWardenByAdmin);
router.patch("/wardens/:id",    verifyToken, requireAdmin,  updateWardenByAdmin);
router.patch("/admin/me",       verifyToken, requireAdmin,  updateAdmin);

// Warden only
router.patch("/warden/me",      verifyToken, requireWarden, updateWardenByWarden);

// Both roles
router.post("/attendance/:id",  verifyToken, requireStaff,  markAttendance);
router.post("/students",        verifyToken, requireStaff,  addStudent);