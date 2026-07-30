import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Mulphry', 'Hollandian', 'Doge', 'Complex', 'Ngonyamo'],
    trim: true,
  },
  floors: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

hostelSchema.index({ name: 1 });

export default mongoose.model('Hostel', hostelSchema);
