const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const roles = ["Lector", "Escritor", "Editor", "Administrador"];
  const rols = [];

  for (let i = 0; i < roles.length; i++) {
    rols.push({
      rol: roles[i],
    });
  }

  await Role.bulkCreate(rols);
  console.log("[Database] Se corrió el seeder de Comments.");
};
