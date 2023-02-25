import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "../routes/router.js";

export const app = express();

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/social", usersRouter);
