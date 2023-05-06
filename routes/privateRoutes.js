const express = require("express");
const router = express.Router();
const privateController = require("../controllers/privateController");
// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", privateController.showTable);

module.exports = router;
