require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign({ data }, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  isAuthorized: (req) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return null;
    }
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
