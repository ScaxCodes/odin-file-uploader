function addFolder(req, res) {
  const { name } = req.body;
  // Logic to add a folder
  console.log(`Adding folder: ${name}`);
  res.redirect("/dashboard");
}

module.exports = {
  addFolder,
};
