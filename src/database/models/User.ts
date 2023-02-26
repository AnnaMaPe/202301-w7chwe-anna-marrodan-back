import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
});

export const User = model("User", userSchema, "users");
