import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";


const VALID_STATUSES = ["present", "absent"];

const serverError = (res, err) =>
    res.status(500).json({ success: false, message: err.message });

const todayISO = () => new Date().toISOString().split("T")[0];

export const markAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
            });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        const today = todayISO();

        const existing = await Attendance.findOne({ student: id, date: today });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Attendance already marked for today",
            });
        }

        const attendance = await Attendance.create({ student: id, date: today, status });

        return res.status(201).json({
            success: true,
            message: "Attendance marked successfully",
            attendance,
        });
    } catch (err) {
        return serverError(res, err);
    }
};
