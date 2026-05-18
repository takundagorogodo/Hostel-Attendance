import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["Mulphry","Hollandian","Doge","Complex","Ngonyamo"]
    },
    floors: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Hostel", hostelSchema);