function editOrDeleteComment(req, res, next) {
  if (req.user.roleId >= 3) {
    next();
  } else {
    res.redirect("back");
  }
}

module.exports = { editOrDeleteComment };
