const express = require("express");
const { badJson } = require("../middlewares/badJson");
const notFound = require("../controllers/notFound");
const { dbConnection } = require("../db/config");
const validateJWT = require("../middlewares/validateJWT");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? 3000;

    this.ROUTES = {
      professors: "/api/professors",
      students: "/api/students",
      auth: "/api/auth",
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(badJson);
  }

  routes() {
    this.app.use(this.ROUTES.professors, [
      validateJWT,
    ], require("../routes/professors"));
    this.app.use(this.ROUTES.students, [
      validateJWT,
    ], require("../routes/students"));
    this.app.use(this.ROUTES.auth, require("../routes/auth"));
    this.app.use("*", notFound);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listen on port ${this.port}`);
    });
  }
}

module.exports = Server;
