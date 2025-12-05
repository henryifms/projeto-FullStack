import { Router } from "express";
import users from "../app/controllers/UsersController.js";

const usersRoutes = Router();

usersRoutes.get("/users", users.index);
usersRoutes.get("/users/:id", users.show);
usersRoutes.post("/users", users.create);

export default usersRoutes;
