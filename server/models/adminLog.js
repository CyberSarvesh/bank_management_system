import mongoose from 'mongoose';

const adminLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Log is created by admin
    },
    details: {
      type: String,
      required: true, // Details of the action performed (e.g., "Added new staff member")
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AdminLog', adminLogSchema);
