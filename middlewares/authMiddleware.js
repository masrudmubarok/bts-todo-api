const jwtUtils = require("../utils/jwtUtils");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is invalid" });
  }
};

module.exports = verifyToken;