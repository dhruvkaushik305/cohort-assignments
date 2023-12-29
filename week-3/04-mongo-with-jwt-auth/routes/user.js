const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwtPassword = "secret";
const jwt = require("jsonwebtoken");
// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.json({
      msg: "User created successfully",
    });
  });
});

router.post("/signin", (req, res) => {
  // Implement admin signup logic
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.json({
        token: jwt.sign({ username: req.body.username }, jwtPassword),
      });
    } else {
      res.json({
        msg: "User does not exist",
      });
    }
  });
});

router.get("/courses", (req, res) => {
  // Implement listing all courses logic
  Course.find({}).then((courses) => {
    res.json({
      courses: courses,
    });
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  await User.updateOne(
    { username: req.username },
    {
      $push: {
        purchasedCourses: req.params.courseId,
      },
    }
  );
  res.json({
    msg: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.username,
  });
  console.log(user);
  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: { $in: user.purchasedCourses },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;
