const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/signup", (req, res) => {
  res.render("signup", { errors: [], formData: {} });
});

module.exports = router;
