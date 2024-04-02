const router = require("express").Router();
const { Blog, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const projectData = await Blog.findAll({
      include: [
        {
          model: Blog,
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render("comment", {
      projects,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
