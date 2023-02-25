import { type Response, type Request, type NextFunction } from "express";
import createDebug from "debug";
import bcryptsjs from "bcryptjs";
import { User } from "../../database/models/User.js";
import { type CredentialsUserStructure } from "../../types.js";

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

export const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CredentialsUserStructure
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = await bcryptsjs.hash(password, 8);
    const avatar = req.file?.filename;

    const user = await User.create({
      username,
      avatar,
      email,
      password,
    });

    res.status(201).json({ username });
  } catch (error) {}
};
