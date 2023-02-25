import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id: String,
  username: String,
  avatar: String,
  password: String,
  email: String,
});

export const User = model("User", userSchema, "users");
