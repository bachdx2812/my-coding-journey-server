const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routers = require("./app/routes");

app.use(bodyParser.json());

app.use("/change_logs", routers.changeLogsRouters);
module.exports = app;
