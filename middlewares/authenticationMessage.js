function mensajeAutenticacion(req, res, next) {
  res.locals.failureFlash = req.flash("failureFlash"); //CLAVE/TYPE DEL MENSAJE DE FAILURE FLASH
  next();
}

module.exports = mensajeAutenticacion;
