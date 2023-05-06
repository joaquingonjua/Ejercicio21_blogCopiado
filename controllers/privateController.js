const express = require("express");
const app = express();

app.use(express.json());

const { Article } = require("../models");

async function showTable(req, res) {
  const articles = await Article.findAll({ include: "author" });
  //   res.json(articles);
  res.render("admin", { articles });
}

module.exports = { showTable };
