const { Author } = require("../models");
const pagesController = require("./pagesController");
const sequelize = require("sequelize");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {
  const authors = await Author.findAll({
    include: { all: true },
    attributes: [
      "id",
      "firstname",
      "lastname",
      "email",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("Author.createdAt"), "%d/%m/%Y %H:%m"),
        "createdAt",
      ],
    ],
  });
  res.render("users", { authors });
}

// Display the specified resource.
async function show(req, res) {
  const { textoBoton, ruta } = pagesController.buttonNavbar(req);
  res.render("login", { textoBoton, ruta });
}

// Show the form for creating a new resource
async function create(req, res) {
  const { textoBoton, ruta, textoBotonB, rutaB } = pagesController.buttonNavbar(req);
  res.render("createAccount", { textoBoton, textoBotonB, ruta, rutaB });
}

// Store a newly created resource in storage.
async function store(req, res) {
  await Author.create({
    firstname: req.body.newFirstname,
    lastname: req.body.newLastname,
    email: req.body.newEmail,
    password: await bcrypt.hash(req.body.newPassword, 2),
    roleId: 1,
  });
  return await res.redirect("/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const user = await Author.findOne({ where: { id: req.params.id }, include: { all: true } });
  const { textoBoton, ruta, textoBotonB, rutaB } = pagesController.buttonNavbar(req);
  res.render("editUser", { user, textoBoton, textoBotonB, ruta, rutaB });
}

// Update the specified resource in storage.
async function update(req, res) {
  let password = req.body.updatePassword;
  const author = await Author.findOne({ where: { id: req.params.id } });
  if (password === author.password) {
    password = author.password;
  } else {
    password = await bcrypt.hash(password, 2);
  }
  await Author.update(
    {
      firstname: req.body.updateFirstname,
      lastname: req.body.updateLastname,
      email: req.body.updateEmail,
      password: await password,
      roleId: req.body.updateRole,
    },
    {
      where: { id: req.params.id },
    },
  );
  res.redirect("/panel/usuarios");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Author.destroy({ where: { id: req.params.id }, include: { all: true } });
  res.redirect("/panel/usuarios");
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
