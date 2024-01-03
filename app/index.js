const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const routers = require("./routes");

app.use(bodyParser.json());
app.use(cors());

app.use("/change_logs", routers.changeLogsRouters);

const port = process.env.PORT || "3000";

app.listen(port);
