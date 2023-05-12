const { passport } = require("../config/passport");

function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: {
      type: "failureFlash", //NOMBRE DEL MESSAGE
      message: "Credenciales incorrectas",
    },
  })(req, res);
}

async function logOut(req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
}

module.exports = { login, logOut };
