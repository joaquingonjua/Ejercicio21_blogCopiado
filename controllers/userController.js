const { Author } = require("../models");
const pagesController = require("./pagesController");
const sequelize = require("sequelize");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

// Display a listing of the resource.
async function index(req, res) {}

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
  });
  return await res.redirect("/login");
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

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
