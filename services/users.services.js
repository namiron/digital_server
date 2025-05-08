const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const USERS_DB_PATH = path.join(__dirname, "../db/users.json");
const jwt_token = process.env.JWT_SECRET;

const readUsers = async () => {
  const data = await fs.readFile(USERS_DB_PATH, "utf-8");
  return JSON.parse(data).users;
};

const writeUsers = async (users) => {
  const data = JSON.stringify({ users }, null, 2);
  await fs.writeFile(USERS_DB_PATH, data);
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "not enough data" });
    }

    const users = await readUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: `User with email:${email} already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashPassword,
      name,
    };

    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      jwt_token,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });

    res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, token: jwt_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during register" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "No login data" });
    }

    const users = await readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "password is not correct" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      jwt_token,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000,
    });

    res.status(201).json({ id: user.id, email: user.email, name: user.name, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
};

const current = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { register, login, current };
