import Student from "../models/Student.js";
import Room from "../models/Room.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const serverError = (res, err) =>
    res.status(500).json({ success: false, message: err.message });

/**
 * Remove a student from their current room.
 * No-op if the student has no assigned room.
 */
const detachFromRoom = async (student) => {
    if (!student.room) return;
    const room = await Room.findById(student.room);
    if (room) {
        room.students.pull(student._id);
        await room.save();
    }
};

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * POST /students
 * Enroll a new student and assign them to a room.
 */
export const addStudent = async (req, res) => {
    try {
        const { name, studentId, roomId } = req.body;

        if (!name || !studentId || !roomId) {
            return res.status(400).json({
                success: false,
                message: "name, studentId, and roomId are all required",
            });
        }

        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "A student with that ID already exists",
            });
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found",
            });
        }

        if (room.students.length >= room.capacity) {
            return res.status(409).json({
                success: false,
                message: "Room is at full capacity",
            });
        }

        const student = await Student.create({ name, studentId, room: roomId });

        room.students.push(student._id);
        await room.save();

        return res.status(201).json({
            success: true,
            message: "Student enrolled successfully",
            student,
        });
    } catch (err) {
        return serverError(res, err);
    }
};

/**
 * DELETE /students/:id
 * Permanently remove a student and vacate their room slot.
 */
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        await detachFromRoom(student);
        await Student.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Student removed successfully",
        });
    } catch (err) {
        return serverError(res, err);
    }
};

/**
 * PATCH /students/:id/room
 * Move a student to a different room within the same hostel.
 */
export const changeRoom = async (req, res) => {
    try {
        const { id } = req.params;       // MongoDB _id of the student
        const { newRoomId } = req.body;

        if (!newRoomId) {
            return res.status(400).json({
                success: false,
                message: "newRoomId is required",
            });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        if (student.room?.toString() === newRoomId) {
            return res.status(409).json({
                success: false,
                message: "Student is already assigned to that room",
            });
        }

        const newRoom = await Room.findById(newRoomId);
        if (!newRoom) {
            return res.status(404).json({
                success: false,
                message: "New room not found",
            });
        }

        if (newRoom.students.length >= newRoom.capacity) {
            return res.status(409).json({
                success: false,
                message: "New room is at full capacity",
            });
        }

        await detachFromRoom(student);

        newRoom.students.push(student._id);
        await newRoom.save();

        student.room = newRoomId;
        await student.save();

        return res.status(200).json({
            success: true,
            message: "Room changed successfully",
        });
    } catch (err) {
        return serverError(res, err);
    }
};

/**
 * PATCH /students/:id/transfer
 * Transfer a student to any available room in a different hostel.
 */
export const transferStudent = async (req, res) => {
    try {
        const { id } = req.params;       // MongoDB _id of the student
        const { newHostelId } = req.body;

        if (!newHostelId) {
            return res.status(400).json({
                success: false,
                message: "newHostelId is required",
            });
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        const availableRoom = await Room.findOne({
            hostel: newHostelId,
            $expr: { $lt: [{ $size: "$students" }, "$capacity"] },
        });

        if (!availableRoom) {
            return res.status(409).json({
                success: false,
                message: "No available rooms in the destination hostel",
            });
        }

        await detachFromRoom(student);

        availableRoom.students.push(student._id);
        await availableRoom.save();

        student.room = availableRoom._id;
        await student.save();

        return res.status(200).json({
            success: true,
            message: "Student transferred successfully",
            room: availableRoom._id,
        });
    } catch (err) {
        return serverError(res, err);
    }
};