// ⚠️ INTENTIONALLY INSECURE — training demo only.
// A real project must never commit secrets. This hardcoded key is the
// "one hardcoded secret" the Day 1 SAST/secret-scanning pass is meant to
// catch — never copy this pattern into real code.
module.exports = {
  JWT_SECRET: "sk_live_51Hc8T2eZvKYlo2C9x7QzT3F8k2Lm9P0qX4rN",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/security-demo",
  PORT: process.env.PORT || 4000,
};
