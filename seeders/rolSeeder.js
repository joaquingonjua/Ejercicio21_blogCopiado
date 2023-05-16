const { faker } = require("@faker-js/faker");
const { Role } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const roles = [
    { role: "Lector", roleCode: "100" },
    { role: "Escritor", roleCode: "200" },
    { role: "Editor", roleCode: "300" },
    { role: "Administrador", roleCode: "400" },
  ];
  const rols = [];

  for (let i = 0; i < roles.length; i++) {
    rols.push({
      roleCode: roles[i].roleCode,
      role: roles[i].role,
    });
  }

  await Role.bulkCreate(rols);
  console.log("[Database] Se corrió el seeder de Comments.");
};
