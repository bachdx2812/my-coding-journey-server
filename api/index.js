const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routers = require("./routes");

app.use(bodyParser.json());

app.use("/change_logs", routers.changeLogsRouters);
const port = process.env.PORT || "3000";

app.listen(port);
