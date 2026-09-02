const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./config");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const app = express();

// ⚠️ VULNERABLE: CORS wide open to every origin (A02 Security Misconfiguration)
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => res.send("Vulnerable MERN demo API — training use only."));

// ⚠️ VULNERABLE: verbose error handler leaks internals (A02 Security Misconfiguration)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message, stack: err.stack });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  });
