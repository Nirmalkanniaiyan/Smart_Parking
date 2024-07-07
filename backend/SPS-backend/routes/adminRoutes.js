const express = require("express");
const {
  registerAdmin,
  currentAdmin,
  loginAdmin,
  editLot,
  editSlot,
} = require("../controllers/adminController");

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/auth/register", registerAdmin);

router.post("/auth/login", loginAdmin);


router.use(validateToken);

router.get("/current", validateToken, currentAdmin);

router.put("/editLot", editLot);

router.put("/editSlot", editSlot);

module.exports = router;