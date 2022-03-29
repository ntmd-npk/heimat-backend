const jwt = require("jsonwebtoken");
const statusResponse = require("../utils/statusResponse");
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json(statusResponse(403, "Fail", "You need authorization."));
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req._id = decoded._id;
    req.role = decoded.role;
    req.username = decoded.username;
    next();
  } catch {
    try {
      const decoded = jwt.verify(token, process.env.REFESH_TOKEN_SECRET);
      next();
    } catch {
      res.status(403).json({ ...statusResponse(403, "Fail", "Please log in again") });
    }
  }
};

const isAdmin = (req, res, next) => {
  if (req.role == "admin") {
    next();
  } else {
    res.status(400).json({
      ...statusResponse(400, "Fail", "You aren't authorized to access this function!!!"),
    });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
