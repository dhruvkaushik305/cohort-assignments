const jwt = require("jsonwebtoken");
const { User } = require("../db/index");
const jwtPassword = "secret";
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.token.split(" ")[1];
  try {
    const decodedValue = jwt.verify(token, jwtPassword);
    if (decodedValue) {
      req.username = decodedValue.username;
      next();
    } else {
      res.status(403).json({ msg: "The password is incorrect" });
    }
  } catch {
    res.json({ msg: "There was an error verifying the token" });
  }
}

module.exports = userMiddleware;
