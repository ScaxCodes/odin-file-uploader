const asyncHandler = require("express-async-handler");
const prisma = require("../db/prisma");

const renderDashboard = asyncHandler(async (req, res) => {
  const data = await getDashboardData(req);
  res.render("dashboard", data);
});

async function getDashboardData(req, error = null) {
  const folders = await getFoldersById(req);
  const selectedFolderId = Number(req.query.folder) || folders[0]?.id;

  return {
    folders,
    selectedFolderId,
    files: [
      { id: 10, name: "report.pdf" },
      { id: 11, name: "image.png" },
    ],
    error,
  };
}

async function getFoldersById(req) {
  const userId = req.user.id;

  const folders = await prisma.directory.findMany({
    where: { userId },
    orderBy: { name: "asc" },
  });

  return folders;
}

module.exports = {
  renderDashboard,
  getDashboardData,
};
