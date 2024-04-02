const router = require("express").Router();
const { Blog, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Blog.findAll({});

    // Serialize data so the template can read it
    const blogs = projectData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const category = await Blog.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const blogs = category.get({ plain: true });

    res.render("blog", {
      ...blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/dashboard", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog", async (req, res) => {
  try {
    const categoryData = await Blog.findAll({
      include: [Blog],
    });
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment", async (req, res) => {
  try {
    const categoryData = await Comment.findAll({
      include: [Blog],
    });
    res.render("comment");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
