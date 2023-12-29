const jwt = require("jsonwebtoken");
const { Admin } = require("../db/index");
const jwtPassword = "secret";
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.token.split(" ")[1];
  try {
    const decodedValue = jwt.verify(token, jwtPassword);
    if (decodedValue) {
      next();
    } else {
      res.status(403).json({ msg: "The password is incorrect" });
    }
  } catch {
    res.json({ msg: "There was an error verifying the token" });
  }
}

module.exports = adminMiddleware;
