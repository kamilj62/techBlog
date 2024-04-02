const express = require("express");
const { Blog } = require("../../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProject = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Blog.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Update the category properties based on the request body
    await category.update(req.body);

    // Return the updated category
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
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
