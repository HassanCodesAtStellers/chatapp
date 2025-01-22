import jwt from "jsonwebtoken";

export const tokenAuthentication = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Use lowercase to ensure compatibility
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT Token is required!!!" });
  }

  // Extract the token (assuming it's in the format "Bearer <token>")
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token is missing!" });
  }

  try {
    const JWTSecret = process.env.JWT_SECRET || "localhost";
    const decoded = jwt.verify(token, JWTSecret); // Verifies the token
    req.user = decoded; // Attach user info to the request object
    next(); // Pass control to the next middleware
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid or expired!" });
  }
};
