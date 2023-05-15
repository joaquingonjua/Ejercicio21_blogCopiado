function isAdmin(req, res, next) {
  if (req.user.roleId >= 4) {
    next();
  } else {
    res.redirect("back");
  }
}

module.exports = { isAdmin };
