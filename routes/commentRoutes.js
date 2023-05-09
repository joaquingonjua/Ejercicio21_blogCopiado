const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// Rutas relacionadas a los comentarios:
// ...

router.post("/", commentsController.store);

module.exports = router;
