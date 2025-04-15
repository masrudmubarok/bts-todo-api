const authService = require("../services/authService");

const register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {
  const token = await authService.login(req.body.username, req.body.password);
  if (!token) {
    return res.status(401).json({ message: "Username atau password salah" });
  }
  res.cookie("token", token, { httpOnly: true }); // Set cookie httpOnly
  res.json({ message: "Login berhasil" });
};

module.exports = {
  register,
  login,
};