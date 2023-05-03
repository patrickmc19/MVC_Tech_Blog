const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// POST a comment
router.post("/", withAuth, (req, res) => {
  console.log(req.body);
  if (req.session) {
    Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    })
      .then((commentData) => res.json(commentData))
      .catch((error) => {
        console.log(error);
        res.status(400).json(error);
      });
  }
});

// DELETE a comment
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((commentData) => {
      // if (!commentData) {
      //   res.status(404).json({ message: "No comment found with this id!" });
      //   return;
      // }
      res.json(commentData);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
