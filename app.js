const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = 3000;

class Initialise {
  constructor() {
    this.routes = {};
    this.dependencies();
    this.routePages();
    this.routeConnection();
    this.connection();
    this.listner();
  }

  dependencies() {
    require("dotenv").config({ path: "config.env" });

    const cors = require("cors");
    const bodyParser = require("body-parser");

    const corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));

    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use(express.json());
  }

  routePages() {
    this.routes.users = require("./routes/users");
    this.routes.tickets = require("./routes/tickets");
    this.routes.admin = require("./routes/admin");
  }

  routeConnection() {
    app.use("/api/user", this.routes.users);
    app.use("/api/tickets", this.routes.tickets);
    app.use("/api/admin", this.routes.admin);
  }

  connection() {
    require("./utils/DBconnection/connection");
  }

  listner() {
    app.listen(process.env.PORT, () => {
      console.log("Listening on " + process.env.PORT);
    });
  }
}

new Initialise();
