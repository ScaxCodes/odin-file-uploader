const { Router } = require("express");
const controller = require("../controllers/controller");
const signupValidator = require("../controllers/signupValidator");
const userController = require("../controllers/userController");
const router = Router();

router.get("/", (req, res) => {
  if (!req.user) {
    res.render("index");
  } else {
    res.send(
      `<h1>Welcome back, ${req.user.username}!</h1><p><a href="/logout">Logout</a></p>`
    );
  }
});

router.get("/signup", (req, res) => {
  res.render("signup", { errors: [], formData: {} });
});
router.post("/signup", signupValidator, userController.addUser);

module.exports = router;
