
const jwt = require("jsonwebtoken");

const authEmployee = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ ok: false, message: "Access denied. Please log in first." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      employeeId: decoded.employeeId,
      empCode: decoded.empCode
    };
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: "Session expired. Please log in again." });
  }
};
module.exports = authEmployee;

