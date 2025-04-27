import mongoose from 'mongoose';

// User schema for customer, staff, manager, admin
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'staff', 'manager', 'admin'],
      default: 'customer',
    },
    branch: {
      type: String,
      required: function () {
        return this.role === 'staff' || this.role === 'manager'; // Only staff and manager have branch
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
