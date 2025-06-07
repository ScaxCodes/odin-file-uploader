const asyncHandler = require("express-async-handler");
const prisma = require("../db/prisma");

const addFolder = asyncHandler(async (req, res) => {
  const folderName = titleCase(req.body.name.trim());
  const userId = req.user.id;

  const folder = await prisma.directory.create({
    data: {
      name: folderName,
      userId,
    },
  });

  console.log("New folder created:", folder);
  res.redirect("/dashboard?folder=" + folder.id);
});

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = {
  addFolder,
};
