const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;   // Frontend request bhejta hai:   headers: { Authorization: `Bearer ${token}`}  Request me header aata hai:
console.log(
  "AUTH HEADER =",
  req.headers.authorization
);
    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];    //["Bearer","eyJhbGciOiJIUzI1Ni..."]  To token mil jayega: token ="eyJhbGciOiJIUzI1Ni..."
 
    try {

        const decoded = jwt.verify(   //Ye check karta hai:token genuine hai? expire to nahi hua?secret key same hai?
            token,
            process.env.JWT_SECRET_KEY
        );
       console.log(decoded);
        req.user = decoded;  //Ab har protected controller me user mil jayega.
//  {
//   id: "685abc123",
//   iat: 1782322310,     console.log(req.user);
//   exp: 1782325910
// }
 
        next();

    } catch (err) {
  console.log("JWT ERROR =>", err.message);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;