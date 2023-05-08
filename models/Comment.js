const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
  static initModel(sequelize) {
    Comment.init(
      {
        content: {
          type: DataTypes.TEXT,
        },
        user: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "comment",
      },
    );
    return Comment;
  }
}

module.exports = Comment;
