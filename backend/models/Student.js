import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,     
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
