async function logOut(req, res) {
  if (req.isAuthenticated()) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  } else {
    /////// no esta logeado //////////////////
    res.json("no estas logeado");
  }
}

module.exports = { logOut };
