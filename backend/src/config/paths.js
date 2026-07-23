const path = require("path");

// Single source of truth for where uploads live on disk. Every file that
// needs this path imports it from here instead of computing its own
// __dirname-relative path - which is what caused uploads to split across
// backend/uploads and backend/src/uploads in the first place.
const PROJECT_ROOT = path.resolve(__dirname, "..", ".."); // backend/src/config -> backend
const UPLOADS_DIR = path.join(PROJECT_ROOT, "uploads");
const VEHICLES_UPLOAD_DIR = path.join(UPLOADS_DIR, "vehicles");

module.exports = { PROJECT_ROOT, UPLOADS_DIR, VEHICLES_UPLOAD_DIR };