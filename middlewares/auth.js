const jwt = require("jsonwebtoken");
const statusResponse = require("../utils/statusResponse");
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(200).json(statusResponse(401, "Fail", "You need authorization."));
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decoded);
    req._id = decoded._id;
    req.role = decoded.role;
    req.username = decoded.username;
    next();
  } catch {
    res.status(200).json({ ...statusResponse(401, "Fail", "Please log in again") });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.role);
  if (req?.role == "admin") {
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
