import jwt from "jsonwebtoken";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const unauthorized = (res, message) =>
    res.status(401).json({ success: false, message });

const forbidden = (res, message) =>
    res.status(403).json(
        { 
            success: false, 
            message 
        }
    );

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return unauthorized(res, "Access denied: no token provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return unauthorized(res, "Session expired: please log in again");
        }
        return unauthorized(res, "Invalid token");
    }
};

export const requireRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return unauthorized(res, "Access denied: not authenticated");
    }

    if (!roles.includes(req.user.role)) {
        return forbidden(res, "Access denied: insufficient permissions");
    }

    next();
};
export const requireAdmin = requireRole("admin");
export const requireWarden = requireRole("warden");
export const requireStaff = requireRole("admin", "warden");
