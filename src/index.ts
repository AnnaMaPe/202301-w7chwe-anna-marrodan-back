import "./loadEnvironment.js";
import { connectDatabase } from "./database/connectDatabase.js";
import { startServer } from "./server/startServer.js";

const port = process.env.PORT ?? 4000;
const mongooseUrl = process.env.MONGOOSE_URL!;

await connectDatabase(mongooseUrl);
await startServer(+port);
