const asyncHandler = require("express-async-handler");
const prisma = require("../db/prisma");
const { getDashboardData } = require("./viewController");

const addFolder = asyncHandler(async (req, res) => {
  const folderName = titleCase(req.body.name.trim());
  const userId = req.user.id;

  try {
    const folder = await prisma.directory.create({
      data: {
        name: folderName,
        userId,
      },
    });

    console.log("New folder created:", folder);
    res.redirect("/dashboard?folder=" + folder.id);
  } catch (err) {
    const folderAlreadyExists =
      err.code === "P2002" &&
      err.meta?.target?.includes("name") &&
      err.meta?.target?.includes("userId");
    if (folderAlreadyExists) {
      const data = await getDashboardData(req, "Folder name already exists!");
      return res.render("dashboard", data);
    }

    throw err;
  }
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
