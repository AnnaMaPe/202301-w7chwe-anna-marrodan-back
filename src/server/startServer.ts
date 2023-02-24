import createDebug from "debug";
import chalk from "chalk";
import { app } from "./app.js";

const debug = createDebug("users");

export const startServer = async (port: number) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(
        chalk.bgGreenBright(
          chalk.red(`Server listening on http://localhost:${port}`)
        )
      );
      resolve(server);
    });
  });
