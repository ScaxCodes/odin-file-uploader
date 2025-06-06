const asyncHandler = require("express-async-handler");
const prisma = require("../db/prisma");

const addFolder = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const folder = await prisma.directory.create({
      data: {
        name,
        userId,
      },
    });
    console.log("New folder created:", folder);
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Error creating folder:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = {
  addFolder,
};
