const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { Author, Role } = require("../models");

function passportConfig() {
  passport.use(
    new LocalStrategy(
      { usernameField: "loginEmail", passwordField: "loginPassword" },

      async (loginEmail, password, done) => {
        try {
          const user = await Author.findOne({ where: { email: loginEmail } });
          if (!user) {
            console.log("Nombre de usuario no existe.");
            return done(null, false, { message: "Credenciales incorrectas." });
          }

          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            console.log("La contraseña es inválida.");
            return done(null, false, { message: "Credenciales incorrectas." });
          }

          console.log("Credenciales verificadas correctamente");
          return done(null, user);
        } catch (err) {
          console.log("error", err);
          done(null, false, { message: "Ocurrió un error inesperado. Por favor, reintentar." });
        }
        // Aquí adentro es necesario validar (contra nuestra base de datos)
        // que username y password sean correctos.
        // Ver la documentación de Passport por detalles.
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Author.findByPk(id, { include: Role });
      done(null, user); // Usuario queda disponible en req.user.
    } catch (err) {
      done(err);
    }
  });
}

module.exports = {
  passport,
  passportConfig,
};
