const jwt = require("jsonwebtoken");
const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user_id = decodedToken.user_id;
    req.body.user_email = decodedToken.email;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { verifyAuth };
