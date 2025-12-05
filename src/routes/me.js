import { Router } from "express";
import User from "../app/models/User.js";
import sessions from "../app/controllers/SessionsController.js";

const meRoutes = new Router();

meRoutes.get("/me", async (req, res) => {
  const userId = sessions.getCurrentUserId();
  console.log(userId);

  if (!userId) {
    return res.status(401).json({ error: "NOt logged in" });
  }

  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "type"],
  });

  return res.json(user);
});

export default meRoutes;
