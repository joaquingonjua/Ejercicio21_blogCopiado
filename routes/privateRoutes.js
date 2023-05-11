const express = require("express");
const ensureAuthenticated = require("../middlewere/ensureAuthenticated");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");
const router = express.Router();

router.get("/");
router.get("/logout", ensureAuthenticated, authenticationController.logOut);

router.get("/", ensureAuthenticated, articleController.index);
router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/", ensureAuthenticated, articleController.store);

router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);
router.delete("/:id", ensureAuthenticated, articleController.destroy);

module.exports = router;
