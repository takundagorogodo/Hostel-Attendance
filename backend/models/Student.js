import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
    default: '',
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

studentSchema.index({ studentId: 1, room: 1 });

export default mongoose.model('Student', studentSchema);
