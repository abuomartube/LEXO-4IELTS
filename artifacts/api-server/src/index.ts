import app from "./app";
import { logger } from "./lib/logger";
import { runSeed } from "./seed";
import { warmUpPdf } from "./routes/vocab-pdf";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function main() {
  await runSeed();
  await new Promise<void>((resolve, reject) => {
    app.listen(port, (err) => {
      if (err) {
        logger.error({ err }, "Error listening on port");
        reject(err);
        return;
      }
      logger.info({ pid: process.pid, hostname: "localhost", port }, "Server listening");
      resolve();
    });
  });
  warmUpPdf();
}

main().catch((err) => {
  logger.error({ err }, "Fatal startup error");
  process.exit(1);
});
