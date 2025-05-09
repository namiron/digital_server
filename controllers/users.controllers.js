const fs = require("fs/promises");
const path = require("path");

const USERS_DB_PATH = path.join(__dirname, "../db/users.json");

const readUsers = async () => {
  const data = await fs.readFile(USERS_DB_PATH, "utf-8");
  return JSON.parse(data).users;
};

const writeUsers = async (users) => {
  const data = JSON.stringify({ users }, null, 2);
  await fs.writeFile(USERS_DB_PATH, data);
};

module.exports = { readUsers, writeUsers };
