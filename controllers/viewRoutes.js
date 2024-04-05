const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
const { ensureAuthenticated } = require("../utils/ensureAuthenticated.js");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Blog.findAll();

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
    const category = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment, include: [{ model: User }] }],
    });
    if (!category) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const blog = category.get({ plain: true });

    console.log(blog);

    res.render("blog", {
      ...blog,
      owner: req.session.user_id === blog.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const categoryData = await Blog.findAll({});

    const blogs = categoryData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog", ensureAuthenticated, async (req, res) => {
  try {
    const categoryData = await Blog.findAll({
      include: [Blog],
    });
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
