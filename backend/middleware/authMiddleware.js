const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 console.log("Authorization Header:", req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  const token = authHeader.split(" ")[1];  //se sirf token mil jayega.
 
  try {
    const decoded = jwt.verify(   //check karega token valid hai ya nahi.
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR =>", err.message);
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authMiddleware;