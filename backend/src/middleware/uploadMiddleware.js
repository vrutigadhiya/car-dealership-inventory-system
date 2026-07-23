const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the directory exists so Multer never throws an ENOENT error
const uploadDir = path.join(__dirname, "../uploads/vehicles");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;