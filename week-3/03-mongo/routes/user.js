const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
// User Routes
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.json({
      msg: "User created successfully",
    });
  });
});

router.get("/courses", (req, res) => {
  Course.find({}).then((courses) => {
    res.json({
      courses: courses,
    });
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  console.log("Inside");
  const courseId = req.params.courseId;
  const username = req.headers.username;
  User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  ).then(() => {
    res.json("Course purchases successfully");
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.headers.username });
  console.log(user.purchasedCourses);
  const courses = await Course.find({
    _id: { $in: user.purchasedCourses },
  });
  console.log(courses);
  res.json({
    courses: courses,
  });
  //   User.findOne({
  //     username: req.headers.username,
  //   }).then((user) => {
  //     Course.find({
  //       _id: { $in: user.purchasedCourses },
  //     }).then((courses) => {
  //       console.log(courses);
  //       res.json({
  //         courses: courses,
  //       });
  //     });
  // res.json({
  //   courses: courses,
  // });
  // console.log(courses);
  //   });
});

module.exports = router;
