const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");
const articleController = require("../controllers/articleController");

router.get("/", pagesController.showHome);

router.get("/login", userController.show);

router.post("/login", authenticationController.login);

router.get("/registrarse", userController.create);

router.post("/registrarse", userController.store);

router.get("/articulos/:id", articleController.show);

module.exports = router;
