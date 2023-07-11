const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const uploadDir = path.join(process.cwd(), "uploads");
const storeAvatars = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

const app = express();
app.use(express.static(storeAvatars));

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use(express.json());

app.post("/api/upload", upload.single("avatar"), async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeAvatars, originalname);

  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }

  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  res.json({ description, message: "File uploaded", status: 200 });
});

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
