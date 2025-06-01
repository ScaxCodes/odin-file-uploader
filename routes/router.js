const { Router } = require("express");
const controller = require("../controllers/controller");
const signupValidator = require("../controllers/signupValidator");
const userController = require("../controllers/userController");
const router = Router();
const passport = require("passport");

router.get("/", (req, res) => {
  if (!req.user) {
    res.render("index");
  } else {
    res.render("dashboard", {
      folders: [
        { id: 1, name: "Home" },
        { id: 2, name: "Documents" },
      ],
      selectedFolderId: Number(req.query.folder) || 1, // default to “home”
      files: [
        // example array of files (only from the selected folder):
        { id: 10, name: "report.pdf" },
        { id: 11, name: "image.png" },
        // ...
      ],
    });
  }
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

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
