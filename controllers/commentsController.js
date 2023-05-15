const { Comment } = require("../models");
const { buttonNavbar } = require("./pagesController");

// Store a newly created resource in storage.
async function store(req, res) {
  await Comment.create({
    authorId: req.user.id,
    content: req.body.content,
    articleId: req.body.articleId,
  });
  res.redirect("back");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  const { textoBoton, textoBotonB, ruta, rutaB } = buttonNavbar(req);
  console.log(textoBoton, textoBotonB, ruta, rutaB);
  await res.render("editComment", { comment, textoBoton, textoBotonB, ruta, rutaB });
}

// Update the specified resource in storage.
async function update(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id }, include: { all: true } });
  await Comment.update(
    {
      content: req.body.comment,
    },
    {
      where: { id: req.params.id },
    },
  );
  await res.redirect(`/articulos/${comment.articleId}`);
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const comment = await Comment.findOne({ where: { id: req.params.id }, include: { all: true } });
  await Comment.destroy({ where: { id: req.params.id } });
  await res.redirect(`/articulos/${comment.articleId}`);
}

module.exports = {
  store,
  edit,
  update,
  destroy,
};
