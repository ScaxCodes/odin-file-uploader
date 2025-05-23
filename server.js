const express = require("express");
const server = express();
const router = require("./routes/router");

const PORT = process.env.PORT || 8000;

server.use(express.urlencoded({ extended: false }));
server.use(express.static("public"));

const path = require("node:path");
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", router);

server.listen(PORT, () =>
  console.log(`Express Server running at http://localhost:${PORT}...`)
);
