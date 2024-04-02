const router = require("express").Router();
const { Blog, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const userData = await Blog.findAll({});

    const users = userData.map((project) => project.get({ plain: true }));

    if (!userData) {
      res.status(404).json(userData);
    }
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
