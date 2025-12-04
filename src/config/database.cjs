require("dotenv").config();

module.exports = {
  dialect: "sqlite",
  storage: process.env.DB_STORAGE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
