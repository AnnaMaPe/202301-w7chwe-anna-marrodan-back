import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());
