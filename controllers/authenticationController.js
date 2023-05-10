async function logOut(req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
}

module.exports = { logOut };
