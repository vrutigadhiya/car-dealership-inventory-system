const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { VEHICLES_UPLOAD_DIR } = require("../config/paths");

// Ensure the target folder exists on disk before Multer tries to write to it
if (!fs.existsSync(VEHICLES_UPLOAD_DIR)) {
  fs.mkdirSync(VEHICLES_UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, VEHICLES_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp", "image/avif"];
const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const isValidMime = allowedMimeTypes.includes(file.mimetype);
  const isValidExt = allowedExtensions.includes(ext);

  if (isValidMime && isValidExt) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPG, JPEG, AVIF and WEBP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload;