const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

function adminMiddleware(req, res, next) {
  const token = req.headers.token;

  try {
    const decode = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.adminId = decode.id;
    next();
  } catch (error) {
    res.status(403).json({
      message: "You are not signed in as Admin!",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
