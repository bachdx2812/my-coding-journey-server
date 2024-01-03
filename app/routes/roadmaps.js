const controllers = require("../controllers/roadmaps");

const router = require("express").Router();

router.get("/", controllers.list);
module.exports = router;
