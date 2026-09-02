const express = require("express");
const _ = require("lodash");
const Note = require("../models/Note");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const notes = await Note.find({ owner: req.userId });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// ⚠️ VULNERABLE: IDOR — returns any note by id, never checks req.userId
// against note.owner (A01 Broken Access Control)
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      body: req.body.body,
      owner: req.userId,
    });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// ⚠️ VULNERABLE: prototype-pollution-prone merge via an old lodash — a
// payload like {"__proto__":{"isAdmin":true}} can pollute Object.prototype
// on lodash 4.17.15 (A03 Software Supply Chain Failures)
router.patch("/:id", requireAuth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Not found" });
    _.merge(note, req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// ⚠️ VULNERABLE: the one missing auth check — no requireAuth middleware at
// all, so anyone can delete anyone's note (A01 Broken Access Control)
router.delete("/:id", async (req, res, next) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
