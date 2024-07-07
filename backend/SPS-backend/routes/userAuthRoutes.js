const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
} = require("../controllers/userAuthController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/auth/register", registerUser);

router.post("/auth/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;