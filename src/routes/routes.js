import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import users from "../app/controllers/UsersController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = new Router();

routes.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});
routes.get("/register", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "..", "views", "register.html")
  );
});
routes.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "login.html"));
});
routes.get("/admin", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "admin.html"));
});
routes.get("/cart", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "cart.html"));
});

routes.get("/users", users.index);
routes.get("/users/:id", users.show);
routes.post("/users", users.create);

export default routes;
