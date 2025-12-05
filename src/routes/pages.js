import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = new Router();

pages.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "index.html"));
});
pages.get("/register", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "..", "views", "register.html")
  );
});
pages.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "login.html"));
});
pages.get("/admin", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "admin.html"));
});
pages.get("/cart", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "views", "cart.html"));
});

export default pages;
