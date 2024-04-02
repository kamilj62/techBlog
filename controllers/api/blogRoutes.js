const express = require("express");
const { Blog } = require("../../models");
const router = express.Router();
const { ensureAuthenticated } = require("../../utils/ensureAuthenticated");

router.post("/", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "No blog with this id!" });
    }

    console.log(updatedBlog);

    res.status(200).json({ message: "Updated blog" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const projectData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
