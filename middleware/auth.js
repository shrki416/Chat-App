const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.status(403).json({ message: "Authorization Denied" });

  try {
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
