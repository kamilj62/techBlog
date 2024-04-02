const router = require("express").Router();
const { Comment, Blog } = require("../../models");

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

router.get("/", async (req, res) => {
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
