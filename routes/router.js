const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", controller.f, (req, res) => {
  res.render("index");
});

module.exports = router;
