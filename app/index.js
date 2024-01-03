const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const app = express();
const routers = require("./routes");

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["https://mycodejourney.vercel.app/", "http://localhost:5173"],
  })
);

app.use("/change_logs", routers.changeLogsRouters);
app.use("/roadmaps", routers.roadmapsRouters);

const port = process.env.PORT || "3000";

app.listen(port);
