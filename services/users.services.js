const bcrypt = require("bcrypt");
const { readUsers, writeUsers } = require("../controllers/users.controllers");
const jwt = require("jsonwebtoken");
const jwt_token = process.env.JWT_SECRET;

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

    res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name, token });
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
