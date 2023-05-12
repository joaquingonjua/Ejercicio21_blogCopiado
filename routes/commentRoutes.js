const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const redirectByRol = require("../middlewares/redirectByRol");

// Rutas relacionadas a los comentarios:
// ...

router.post("/", redirectByRol([1, 2, 3, 4]), commentsController.store);

module.exports = router;
