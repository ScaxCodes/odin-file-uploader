function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).render("unauthorized", {
    message: "You must be logged in<br> to view this page.",
  });
}

module.exports = {
  ensureAuthenticated,
};
