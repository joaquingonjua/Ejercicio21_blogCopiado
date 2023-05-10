const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const ensureAuthenticated = require("../middlewere/ensureAuthenticated");

// Rutas relacionadas a los artículos:
// ...

// router.get("/admin", articleController.index);
router.get("/", ensureAuthenticated, articleController.index);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/", ensureAuthenticated, articleController.store);
router.get("/:id", articleController.show);
router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);
router.delete("/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
