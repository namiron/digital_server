const express = require("express");
const { categories, category } = require("../services/laureates.services");
const router = express.Router();

//http://localhost:4000/api/laureates/categories
router.get("/laureates/categories", categories);
//http://localhost:4000/api/laureates/category?limit=10&offset=20
router.get("/laureates/:category", category);

module.exports = router;
