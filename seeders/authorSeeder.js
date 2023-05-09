const { faker } = require("@faker-js/faker");
const { Author } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const authors = [];

  for (let i = 0; i < 20; i++) {
    let fName = faker.name.firstName();
    let encryptedPassword = await bcrypt.hash("carlos", 2);
    authors.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: encryptedPassword,
    });
  }

  await Author.bulkCreate(authors);
  console.log("[Database] Se corrió el seeder de Author.");
};
