import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'warden', 'student'], default: 'warden' },
  isDeleted: { type: Boolean, default: false },
  profile: { type: mongoose.Schema.Types.ObjectId, refPath: 'profileModel' },
  profileModel: { type: String, enum: ['Student'], default: null },
}, { timestamps: true });

userSchema.index({ username: 1 });
export default mongoose.model('User', userSchema);