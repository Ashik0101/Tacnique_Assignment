const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "Missing Token" });
      return;
    }

    // Verify the token to ensure it's valid and hasn't been tampered with.
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(400).send({ message: "Invalid Token" });
        return;
      }

      // Attach the userId to req.body
      req.body.user = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { authenticator };
