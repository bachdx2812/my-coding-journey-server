const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routers = require("./routes");

app.use(bodyParser.json());

// app.use("/change_logs", routers.changeLogsRouters);

app.get("/api/test", (req, res) => {
  res.end("jkljklqw");
});

const port = process.env.PORT || "3000";

app.listen(port);
