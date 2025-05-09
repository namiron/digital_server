const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;
const { readUsers } = require("../controllers/users.controllers");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, secret_key);
    const users = await readUsers();
    const user = users.find((u) => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth };
