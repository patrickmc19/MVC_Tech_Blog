const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts and render homepage
router.get("/", (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ["id", "postContent", "title", "createdAt"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // pass all posts into the rendered homepage template
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    // catch and log error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render single post page
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "postContent", "title", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });
      // pass data to rendered template
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    // if user is already logged in, redirect to homepage
    res.redirect("/");
    return;
  }

  res.render("login");
});

// render signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    // if user is already logged in, redirect to homepage
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
