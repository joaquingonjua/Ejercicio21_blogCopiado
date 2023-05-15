const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const isEditor = require("../middlewares/isEditor");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

// Rutas relacionadas a los comentarios:
// ...

router.post("/", commentsController.store);

router.get(
  "/editar/:id",
  ensureAuthenticated,
  isEditor.editOrDeleteComment,
  commentsController.edit,
);
router.patch(
  "/editar/:id",
  ensureAuthenticated,
  isEditor.editOrDeleteComment,
  commentsController.update,
);

router.delete(
  "/:id",
  ensureAuthenticated,
  isEditor.editOrDeleteComment,
  commentsController.destroy,
);

module.exports = router;
