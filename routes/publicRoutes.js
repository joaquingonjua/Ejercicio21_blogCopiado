const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const userController = require("../controllers/userController");
const authenticationController = require("../controllers/authenticationController");
const ensureAuthenticated = require("../middlewere/ensureAuthenticated");
const passport = require("passport");

router.get("/", pagesController.showHome);

router.get("/login", userController.show);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/articulos",
    failureRedirect: "/login",
  }),
);

router.get("/logout", ensureAuthenticated, authenticationController.logOut);

module.exports = router;
