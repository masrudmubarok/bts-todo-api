const { User } = require("../models/userModel");

const createUser = async (userData) => {
  return User.create(userData);
};

const findUserByUsername = async (username) => {
  return User.findOne({ where: { username } });
};

module.exports = {
  createUser,
  findUserByUsername,
};