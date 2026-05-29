import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: function () {
        return this.role === "patient";
      }
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: function () {
        return this.role === "patient";
      }
    },

    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    otp: {
      type: String,
      default: ""
    },

    otpExpiry: {
      type: Date
    },
  },
  
  {
    timestamps: true
  }
);

export default mongoose.model(
  "User",
  userSchema
);