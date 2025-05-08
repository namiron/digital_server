const express = require("express");
const { login, register, current } = require("../services/users.services");
const { auth } = require("../middleware/auth.middleware");
const router = express.Router();

//http://localhost:4000/auth/login
router.post("/login", login);
//http://localhost:4000/auth/register
router.post("/register", register);

//http://localhost:4000/auth/current
router.get("/current", auth, current);
module.exports = router;

// {
// 	"name": "Alx",
//     "email":"alxlxa@gmai.com",
//     "password":"12345Alx"
// }
