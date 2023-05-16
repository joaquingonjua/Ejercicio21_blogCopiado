function editOrDeleteComment(req, res, next) {
  if (req.user.role.roleCode >= 300) {
    next();
  } else {
    res.redirect("back");
  }
}

module.exports = { editOrDeleteComment };
