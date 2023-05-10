const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];
  for (let i = 0; i < 20; i++) {
    comments.push({
      content: faker.lorem.paragraph(),
      articleId: faker.datatype.number({ min: 1, max: 20 }),
      authorId: faker.datatype.number({ min: 1, max: 20 }),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
