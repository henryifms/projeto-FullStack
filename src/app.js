import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/routes.js"

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;