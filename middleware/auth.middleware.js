const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.cookies.token;  
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;  
    next();
  });
};

module.exports = { auth };
