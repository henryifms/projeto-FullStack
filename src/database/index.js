import { Sequelize } from "sequelize";
import config from "../config/database.cjs";

import User from "../app/models/User.js";

const models = [User];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }
  init() {
    models.forEach((model) => model.init(this.connection));
  }
  associate() {
    models.forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(this.connection.models);
      }
    });
  }
}
export default new Database();
