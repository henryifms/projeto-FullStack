import User from "../models/User.js";

let currentUserId = null;

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isValid = await user.checkPassword(password);
    if (!isValid) return res.status(401).json({ error: "Password invalid" });

    currentUserId = user.id;

    return res.json({ message: "Logged in" });
  }

  getCurrentUserId() {
    return currentUserId;
  }
}
export default new SessionsController();
