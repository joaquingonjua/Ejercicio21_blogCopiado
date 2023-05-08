const express = require("express");
const app = express();

app.use(express.json());

const { Article } = require("../models");

async function showTable(req, res) {}

module.exports = { showTable };
