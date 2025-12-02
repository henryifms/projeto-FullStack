import { Route, Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import customers from "../app/controllers/CustomersController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = new Router();

routes.get("/customers", customers.index);

export default routes;