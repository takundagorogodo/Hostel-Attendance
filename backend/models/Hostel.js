import mongoose from 'mongoose';

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Mulphry', 'Hollandia', 'Dodge', 'New Complex', 'Ngonyamo'],
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

export default mongoose.model('Hostel', hostelSchema);
