const express = require("express");
const { home } = require("../services/home.services");
const router = express.Router();

//http://localhost:4000/
router.get("/", home);

module.exports = router;
