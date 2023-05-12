function redirectByRol(array) {
  return (req, res, next) => {
    if (array.includes(req.user.rolId)) {
      next();
    } else {
      console.log("No tienes acceso");
      res.redirect("/");
    }
  };
}

module.exports = redirectByRol;
