import { Router } from "express";
import { getUsers } from "../server/controllers/controllers.js";

export const usersRouter = Router();

usersRouter.get("/", getUsers);
