import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js";
import "./database/index.js";
import authMiddlewares from "./app/middlewares/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, "..", "public")));
    this.server.use(express.static(path.join(__dirname, "..", "views")));
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(authMiddlewares);
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
