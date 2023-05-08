const { faker } = require("@faker-js/faker");
const { Comment } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const comments = [];
  for (let i = 0; i < 20; i++) {
    comments.push({
      content: faker.lorem.paragraph(),
      articleId: faker.datatype.number({ min: 1, max: 20 }),
      user: faker.name.firstName() + " " + faker.name.lastName(),
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
