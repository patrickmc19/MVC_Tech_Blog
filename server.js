require("dotenv").config();
const exphbs = require("express-handlebars");
const express = require("express");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/connection");
const router = require("./controllers");
const helpers = require("./utils/helpers");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3306;
const app = express();
const hbs = exphbs.create({ helpers });

// setup app middleware
// app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars.js engine with custom helpers

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// connect routes
app.use(router);

// connect db and listen
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, (err) => {
      console.log(`Server listening on port ${PORT}!`);
      if (err) {
        console.error(err);
        return process.exit(1);
      }
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });