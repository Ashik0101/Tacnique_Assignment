const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  handler: (req, res, next) => {
    const timeUntilReset = Math.ceil(
      (req.rateLimit.resetTime - Date.now()) / 1000
    );
    res.status(429).json({
      message: `Too Many Requests. Try after ${timeUntilReset} seconds`,
    });
  },
});

module.exports = { limiter };
