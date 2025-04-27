import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    loanTerm: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: function () {
        return this.status === 'approved'; // Only set this if loan is approved
      },
    },
    approvalDate: {
      type: Date,
      required: function () {
        return this.status === 'approved';
      },
    },
    rejectionReason: {
      type: String,
      required: function () {
        return this.status === 'rejected';
      },
    },
    branch: {
      type: String,
      required: true,
    },
    loanCreatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Loan', loanSchema);
