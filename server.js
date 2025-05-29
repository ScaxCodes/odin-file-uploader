const express = require("express");
const server = express();
const setLocals = require("./middleware/setLocals");
const router = require("./routes/router");
const methodOverride = require("method-override");

const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./auth/passport-config");
initializePassport(passport);

const PORT = process.env.PORT || 8000;

server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));
server.use(express.static("public"));

server.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
server.use(passport.session());

const path = require("node:path");
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.use("/", setLocals);

server.use("/", router);

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

server.listen(PORT, () =>
  console.log(`Express Server running at http://localhost:${PORT}...`)
);
