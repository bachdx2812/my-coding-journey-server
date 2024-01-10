const controllers = require("../controllers/snippet_generator");

const router = require("express").Router();

router.post("/", controllers.generator);
module.exports = router;
