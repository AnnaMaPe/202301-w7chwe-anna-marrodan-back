import express from "express";
import cors from "cors";
import morgan from "morgan";
import { usersRouter } from "../routes/router.js";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";

export const app = express();

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/social", usersRouter);

app.use("/", notFoundError);
app.use("/", generalError);
