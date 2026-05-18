import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    date: {
        type: String,   // e.g. "2026-05-19"
        required: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }
}, { timestamps: true });

// 🔥 prevent duplicate attendance per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);