import jsonServer from "json-server";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "database.json"));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
