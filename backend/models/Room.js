import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true,
  },
  floor: {
    type: Number,
    required: true,
    min: 1,
  },
  capacity: {
    type: Number,
    default: 3,
    min: 1,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    }
  ],
}, { timestamps: true });

roomSchema.index({ hostel: 1, floor: 1 });

export default mongoose.model('Room', roomSchema);
