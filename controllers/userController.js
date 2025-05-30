const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const prisma = require("../db/prisma");

const addUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log("New user created:", user);

  res.redirect("/");
});

module.exports = {
  addUser,
};
