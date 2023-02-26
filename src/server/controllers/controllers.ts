import { type Response, type Request, type NextFunction } from "express";
import createDebug from "debug";
import bcryptsjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../database/models/User.js";
import { type CredentialsUserStructure } from "../../types.js";
import { CustomError } from "../../CustomError/CustomError.js";

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
      password: hashedPassword,
    });

    res.status(201).json({ message: "User was succesfully created" });
  } catch (error) {
    const customError = new CustomError(
      "The user could not be created",
      409,
      "There was an issue creating the user"
    );
    next(customError);
  }
};

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    CredentialsUserStructure
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );
      next(error);
      return;
    }

    const passwordComparer = await bcryptsjs.compare(password, user.password!);

    if (!passwordComparer) {
      const error = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );
      next(error);
      return;
    }

    const jwtPayload = {
      sub: user?._id,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
