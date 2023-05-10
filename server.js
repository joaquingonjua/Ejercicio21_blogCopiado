require("dotenv").config();

const express = require("express");
let methodOverride = require("method-override");
const routes = require("./routes");
const Author = require("./models/Author");
const sequelize = require("sequelize");

//----------------------------------------------//
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//----------------------------------------------//

const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);

app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },

    async (username, password, done) => {
      try {
        const user = await Author.findOne({ where: { email: username } });
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
        done(err);
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
    const author = await Author.findByPk(id);
    done(null, author); // Usuario queda disponible en req.author.
  } catch (err) {
    done(err);
  }
});

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
