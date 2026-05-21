// ─── Custom Error Class ───────────────────────────────────────────────────────

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// ─── 404 Handler ──────────────────────────────────────────────────────────────

/**
 * Catches requests that didn't match any route.
 * Must be registered AFTER all routes.
 */
export const notFound = (req, res, next) => {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};

// ─── Mongoose Error Normalizers ───────────────────────────────────────────────

const handleCastError = (err) =>
    new AppError(`Invalid ${err.path}: "${err.value}"`, 400);

const handleValidationError = (err) => {
    const messages = Object.values(err.errors).map((e) => e.message);
    return new AppError(`Validation failed: ${messages.join(", ")}`, 400);
};

const handleDuplicateKeyError = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    return new AppError(`"${value}" is already taken for field: ${field}`, 409);
};

// ─── JWT Error Normalizers ────────────────────────────────────────────────────

const handleJWTError = () =>
    new AppError("Invalid token: please log in again", 401);

const handleJWTExpiredError = () =>
    new AppError("Session expired: please log in again", 401);

// ─── Response Senders ─────────────────────────────────────────────────────────

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const sendProdError = (err, res) => {
    // Operational errors: safe to expose to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    // Programming or unknown errors: don't leak details
    console.error("UNHANDLED ERROR:", err);
    return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
    });
};

// ─── Global Error Handler ─────────────────────────────────────────────────────

/**
 * Central error-handling middleware.
 * Must be registered LAST in app.js, after all routes and other middleware.
 *
 * Usage in app.js:
 *   import { notFound, globalErrorHandler } from "./middleware/errorMiddleware.js";
 *   app.use(notFound);
 *   app.use(globalErrorHandler);
 */
export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode ?? 500;

    if (process.env.NODE_ENV === "development") {
        return sendDevError(err, res);
    }

    // Normalize known error types into AppErrors
    let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);

    if (err.name === "CastError")                error = handleCastError(err);
    if (err.name === "ValidationError")          error = handleValidationError(err);
    if (err.code === 11000)                      error = handleDuplicateKeyError(err);
    if (err.name === "JsonWebTokenError")        error = handleJWTError();
    if (err.name === "TokenExpiredError")        error = handleJWTExpiredError();

    return sendProdError(error, res);
};