import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied',
  },
  jobDescription: { type: String, default: '' },
  notes: { type: String, default: '' },
  appliedDate: { type: Date, default: Date.now },
  salary: { type: String, default: '' },
  location: { type: String, default: '' },
  link: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);