const jwtUtils = require("../utils/jwtUtils");

const verifyToken = (req, res, next) => {
  // Ambil token dari cookie atau Authorization header
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwtUtils.verifyToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};

module.exports = verifyToken;