const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
    dialectOptions: {
      dateStrings: true,
    },
    timezone: "-03:00",
  },
);

const Author = require("./Author");
const Comment = require("./Comment");
const Article = require("./Article");
const Role = require("./Rol");

Author.initModel(sequelize);
Comment.initModel(sequelize);
Article.initModel(sequelize);
Role.initModel(sequelize);

Role.hasMany(Author);
Author.belongsTo(Role);

Article.belongsTo(Author);
Comment.belongsTo(Article);
Article.hasMany(Comment);

Author.hasMany(Article);
Author.hasMany(Comment);
Comment.belongsTo(Author);

/**
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */

module.exports = {
  sequelize,
  Author,
  Comment,
  Article,
  Role,
};
