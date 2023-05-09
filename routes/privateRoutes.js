const express = require("express");
const router = express.Router();
const privateController = require("../controllers/privateController");

router.get("/");

module.exports = router;
