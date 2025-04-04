const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Authentication failed");
  }
  const token = authHeader.split(" ")[1];

  try {
    const userToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.body.user = { userId: userToken.userId };
    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

module.exports = { authMiddleware };
