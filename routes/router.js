const { Router } = require("express");
const passport = require("passport");
const signupValidator = require("../controllers/signupValidator");
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require("../auth/auth-middleware");
const viewController = require("../controllers/viewController");
const folderController = require("../controllers/folderController");

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup", { errors: [], formData: {} });
});
router.post("/signup", signupValidator, userController.addUser);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.use("/dashboard", ensureAuthenticated);

router.get("/dashboard", viewController.renderDashboard);

router.post("/dashboard/folders", folderController.addFolder);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
