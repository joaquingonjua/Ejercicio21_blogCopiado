const { Author } = require("../models");
const pagesController = require("./pagesController");
const sequelize = require("sequelize");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");

// Display the specified resource.
async function show(req, res) {
  res.render("editMyProfile");
}

// Update the specified resource in storage.
async function update(req, res) {
  await Author.update(
    {
      firstname: req.body.myFirstname,
      lastname: req.body.myLastname,
      email: req.body.myEmail,
    },
    {
      where: { id: req.params.id },
    },
  );
  res.redirect("/");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Author.destroy({ where: { id: req.params.id }, include: { all: true } });
  await req.session.destroy(function (err) {
    res.redirect("/");
  });
}

// Otros handlers...
// ...

module.exports = {
  show,
  update,
  destroy,
};
