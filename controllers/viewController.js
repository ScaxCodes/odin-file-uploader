function renderDashboard(req, res) {
  const selectedFolderId = Number(req.query.folder) || 1;

  res.render("dashboard", {
    folders: [
      { id: 1, name: "Home" },
      { id: 2, name: "Documents" },
    ],
    selectedFolderId,
    files: [
      { id: 10, name: "report.pdf" },
      { id: 11, name: "image.png" },
    ],
  });
}

module.exports = {
  renderDashboard,
};
