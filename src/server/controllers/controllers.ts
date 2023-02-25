import { type Response, type Request, type NextFunction } from "express";
import createDebug from "debug";
import { User } from "../../database/models/User.js";

const debug = createDebug("users:controllers");

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error: unknown) {
    debug("User not found");
  }
};
