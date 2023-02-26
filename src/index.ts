import "./loadEnvironment.js";
import { connectDatabase } from "./database/connectDatabase.js";
import { startServer } from "./server/startServer.js";
import mongoose from "mongoose";

const port = process.env.PORT ?? 4000;
const mongooseUrl = process.env.MONGOOSE_URL!;
mongoose.set("toJSON", {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

await connectDatabase(mongooseUrl);
await startServer(+port);
