const { Article } = require("../models");
const { format, formatDistance, formatRelative, subDays } = require("date-fns");
const { es } = require("date-fns/locale");

// Display a listing of the resource.
async function index(req, res) {
  const articles = await Article.findAll({ include: "author" });
  for (let i = 0; i < articles.length; i++) {
    articles[i].createdAt.defaultValue = format(new Date(), "dd MM yyyy HH:mm", { locale: es });
  }
  console.log(articles[0].createdAt);
  res.render("admin", { articles });
}

// Display the specified resource.
async function show(req, res) {
  res.render("article");
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("createArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
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
  console.log(req.body);
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
