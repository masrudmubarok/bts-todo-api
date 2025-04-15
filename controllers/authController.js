const authService = require("../services/authService");

const register = async (req, res) => {
  const user = await authService.register(req.body);
  res.status(201).json(user);
};

const login = async (req, res) => {
  const token = await authService.login(req.body.username, req.body.password);
  if (!token) {
    return res.status(401).json({ message: "Username or password incorrect" });
  }
  res.cookie("token", token, { httpOnly: true });
  res.json({
    message: "Login successfully",
    token: token,
  });
};

module.exports = {
  register,
  login,
};