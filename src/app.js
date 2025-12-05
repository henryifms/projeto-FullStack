import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authMiddlewares from "./app/middlewares/auth.js";

import pages from "./routes/pages.js";
import usersRoutes from "./routes/users.js";
import sessionsRoutes from "./routes/sessions.js";
import meRoutes from "./routes/me.js";

import "./database/index.js";

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
    this.server.use(pages);
    this.server.use(usersRoutes);
    this.server.use(sessionsRoutes);
    this.server.use(meRoutes);
  }
}
export default new App().server;
