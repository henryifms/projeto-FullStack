import { Router } from "express";
import sessions from "../app/controllers/SessionsController.js";

const sessionsRoutes = new Router();

sessionsRoutes.post("/sessions", sessions.create);

export default sessionsRoutes;
