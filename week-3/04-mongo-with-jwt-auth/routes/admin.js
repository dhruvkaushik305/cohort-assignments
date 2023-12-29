const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
// Admin Routes
router.post("/signup", (req, res) => {
  Admin.create({
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.json({ msg: "Admin created successfully" });
  });
});

router.post("/signin", (req, res) => {
  Admin.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({
        token: jwt.sign({ username: req.body.username }, jwtPassword),
      });
    } else {
      res.json({
        msg: "Admin does not exist",
      });
    }
  });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  Course.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageLink: req.body.imageLink,
  }).then((course) => {
    res.json({
      msg: "Course created successfully",
      courseId: course._id,
    });
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  Course.find({}).then((courses) => {
    res.json({
      courses: courses,
    });
  });
});

module.exports = router;
