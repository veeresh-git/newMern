import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    lastName: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 15,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 15,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
