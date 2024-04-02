const router = require("express").Router();
const { Blog, Comment, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Blog.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ["name"],
      //   },
      // ],
    });

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

module.exports = router;
