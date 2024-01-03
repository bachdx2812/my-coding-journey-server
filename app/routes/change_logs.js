const controllers = require("../controllers/change_logs");

const router = require("express").Router();

router.get("/", controllers.list);
module.exports = router;
