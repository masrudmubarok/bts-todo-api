const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwtUtils");

const register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;
  return userRepository.createUser(userData);
};

const login = async (username, password) => {
  const user = await userRepository.findUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }
  return jwtUtils.generateToken(user.id);
};

module.exports = {
  register,
  login,
};