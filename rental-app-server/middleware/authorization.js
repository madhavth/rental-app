const jwt = require("jsonwebtoken");
const requireAuthorization = async (req, res, next) => {
  try {
    const authString = req.headers["authorization"];
    if (!authString) return next(new Error("Authorization required"));
    const jwtClient = authString.split(" ")[1];
    const decodedToken = jwt.verify(jwtClient, process.env.SECRET);
    req.userData = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};
const checkUser = (req, res, next) => {
  if (req.userData.role !== "user") {
    return next(new Error("User access denied"));
  }
  next();
};

const checkAdmin = (req, res, next) => {
  if (req.userData.role !== "admin") {
    return next(new Error("Admin access denied"));
  }
  next();
};
module.exports = { requireAuthorization, checkUser, checkAdmin };
