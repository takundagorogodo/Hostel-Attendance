const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        default: 3
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
}, { timestamps: true });