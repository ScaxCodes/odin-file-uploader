const bcrypt = require("bcryptjs");
const prisma = require("../db/prisma");

const addUser = async (req, res) => {
  const { username, password } = req.body;
  const formData = { username };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        directories: {
          create: [{ name: "Home" }, { name: "Work" }, { name: "Projects" }],
        },
      },
    });

    console.log("New user created:", user);
    res.redirect("/");
  } catch (err) {
    if (err.code === "P2002" && err.meta?.target?.includes("username")) {
      return res.render("signup", {
        errors: [{ path: "username", msg: "Username already exists" }],
        formData,
      });
    }

    throw err;
  }
};

module.exports = {
  addUser,
};
