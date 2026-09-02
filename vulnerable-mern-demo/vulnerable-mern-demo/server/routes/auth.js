const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // ⚠️ VULNERABLE: no hashing before save (A04 Cryptographic Failures)
    const user = await User.create({ username, password });
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // ⚠️ VULNERABLE: NoSQL injection — req.body values go straight into the
    // query. A payload like {"username":"admin","password":{"$ne":null}}
    // bypasses the password check entirely (A05 Injection).
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // ⚠️ VULNERABLE: token signed with no expiry (A07 Authentication Failures)
    const token = jwt.sign({ sub: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
