const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");
const userController = require("../controllers/userController");
const router = express.Router();
const { isAdmin } = require("../middlewares/isAdmin");

router.get("/");
router.get("/logout", ensureAuthenticated, authenticationController.logOut);

router.get("/admin", ensureAuthenticated, articleController.index);

router.get("/crear", ensureAuthenticated, articleController.create);
router.post("/crear", ensureAuthenticated, articleController.store);

router.get("/:id/editar", ensureAuthenticated, articleController.edit);
router.patch("/:id", ensureAuthenticated, articleController.update);

router.delete("/:id", ensureAuthenticated, articleController.destroy);

router.get("/usuarios", ensureAuthenticated, isAdmin, userController.index);

router.get("/usuarios/editar/:id", ensureAuthenticated, isAdmin, userController.edit);
router.patch("/usuarios/editar/:id", ensureAuthenticated, isAdmin, userController.update);

module.exports = router;
