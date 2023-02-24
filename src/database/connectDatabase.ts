import mongoose from "mongoose";
import createDebug from "debug";

const debug = createDebug("users:database");

export const connectDatabase = async (mongooseUrl: string) => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(mongooseUrl);
    debug("Connected");
  } catch (error) {
    debug("Error on connecting to database", (error as Error).message);
  }
};
