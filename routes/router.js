const { Router } = require("express");
const controller = require("../controllers/controller");
const signupValidator = require("../controllers/signupValidator");
const userController = require("../controllers/userController");
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup", { errors: [], formData: {} });
});
router.post("/signup", signupValidator, userController.addUser);

module.exports = router;
