import jwt from "jsonwebtoken";

export const tokenAuthentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT Token is required!!!" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is missing!" });
  }

  try {
    const JWTSecret = process.env.JWT_SECRET || "localhost";
    const decoded = jwt.verify(token, JWTSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired!" });
  }
};
