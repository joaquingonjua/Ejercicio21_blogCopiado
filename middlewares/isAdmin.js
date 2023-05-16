function isAdmin(req, res, next) {
  if (req.user.role.roleCode >= 400) {
    next();
  } else {
    res.redirect("back");
  }
}

module.exports = { isAdmin };
