const jwt = require("jsonwebtoken");

module.exports = function jwtAuth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")?.[1] ?? null;

  if (!token)
    return res.status(401).json({
      code: 401,
      success: false,
      message: "Unauthorized: No token provided",
    });

  try {
    const verified = jwt.verify(token, process.env.SEC_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ code: 400, success: false, message: "Invalid token" });
  }
};
