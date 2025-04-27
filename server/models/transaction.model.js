import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    receiptNumber: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true, // Branch from where transaction was made
    },
  },
  { timestamps: true }
);

export default mongoose.model('Transaction', transactionSchema);
