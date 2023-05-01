const jwt = require("jsonwebtoken");

export const verifyJWT = (req, res, next) => {
  // Get headers
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // Check if token is provided
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  // Separate "Bearer" from token
  const bearer = authHeader.split(" ")[1];
  jwt.verify(bearer, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid acc token" });
    req.email = decoded.email;
    next();
  });
};
