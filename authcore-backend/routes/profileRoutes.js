const express = require("express");

const router = express.Router();

const {
  createProfileController,
  getProfileController,
  updateProfileController
} = require("../controllers/profileController");

const { verifyToken } = require("../middleware/authMiddleware");

// All profile routes require a logged-in user. The controllers trust
// req.user.id (from the verified token) over any client-supplied user_id.
router.use(verifyToken);

router.get("/:user_id", getProfileController);

router.put("/update-profile/:user_id", updateProfileController);

router.post("/create-profile", createProfileController);

module.exports = router;
