import { model, Schema } from "mongoose";

const userSchema = new Schema({
  id: String,
  username: String,
  avatar: String,
  password: String,
});

export const User = model("User", userSchema, "users");
