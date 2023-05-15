function redirectByRol(array) {
  return (req, res, next) => {
    if (array.includes(req.user.roleId)) {
      next();
    } else {
      console.log("No tienes acceso");
      res.redirect("/");
    }
  };
}

module.exports = redirectByRol;
