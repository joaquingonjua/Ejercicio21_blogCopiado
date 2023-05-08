const { Article } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll({
    include: "author",
    attributes: [
      "id",
      "title",
      "content",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("Article.createdAt"), "%d/%m/%Y %H:%m"),
        "createdAt",
      ],
    ],
  });
  res.render("admin", { articles });
}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: "author",
    attributes: [
      "id",
      "title",
      "content",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("Article.createdAt"), "%d/%m/%Y %H:%m"),
        "createdAt",
      ],
    ],
  });
  const comments = await Comment.findAll({
    where: { articleId: req.params.id },
    attributes: [
      "id",
      "content",
      "user",
      [
        sequelize.fn("DATE_FORMAT", sequelize.col("Comment.createdAt"), "%d/%m/%Y %H:%m"),
        "createdAt",
      ],
    ],
  });
  res.render("article", { article, comments });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("createArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/img",
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    console.log(files, fields);
    res.redirect("articulos");
    if (err) {
      console.log(err);
    }
  });

  await Article.create({
    title: req.body.title,
    content: req.body.content,
    authorId: Number(req.body.authorId),
  });
  res.redirect("/articulos");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  req.body.title = res.render("editArticle", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId,
    },
    {
      where: { id: req.params.id },
    },
  );
  res.redirect("/articulos");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({ where: { id: req.params.id } });
  res.redirect("/articulos");
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
