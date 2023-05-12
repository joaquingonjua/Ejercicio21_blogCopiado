const express = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");
const router = express.Router();
const redirectByRol = require("../middlewares/redirectByRol");

router.get("/");
router.get("/logout", ensureAuthenticated, authenticationController.logOut);

router.get("/admin", ensureAuthenticated, articleController.index);

router.get("/crear", ensureAuthenticated, redirectByRol([2, 3, 4]), articleController.create);
router.post("/crear", ensureAuthenticated, redirectByRol([2, 3, 4]), articleController.store);

router.get("/:id/editar", ensureAuthenticated, redirectByRol([2, 3, 4]), articleController.edit);
router.patch("/:id", ensureAuthenticated, redirectByRol([2, 3, 4]), articleController.update);

router.delete("/:id", ensureAuthenticated, redirectByRol([2, 3, 4]), articleController.destroy);

module.exports = router;
