const asyncHandler = require("express-async-handler");
const prisma = require("../db/prisma");

const renderDashboard = asyncHandler(async (req, res) => {
  const folders = await getFoldersById(req, res);
  const selectedFolderId = Number(req.query.folder) || folders[0]?.id;

  res.render("dashboard", {
    folders,
    selectedFolderId,
    files: [
      { id: 10, name: "report.pdf" },
      { id: 11, name: "image.png" },
    ],
  });
});

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
};
