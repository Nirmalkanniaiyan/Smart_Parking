const express = require("express");
const router = express.Router();
const {
  getAllSlots,
  createSlot,
  getSlot,
  updateSlot,
  deleteSlot,
  getAllFreeSlots,
  getAllClosedSlots,
  freezeSlot,
  unfreezeSlot,
} = require("../controllers/slotController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/getAllSlots").get(getAllSlots);
router.route("/createSlot").post(createSlot);
router.route("/getSlot/:id").get(getSlot);
router.route("/updateSlot/:id").put(updateSlot);
router.route("/deleteSlot/:id").delete(deleteSlot);
router.route("/getAllFreeSlots").get(getAllFreeSlots);
router.route("/getAllClosedSlots").get(getAllClosedSlots);
router.route("/freezeSlot/:id").put(freezeSlot);
router.route("/unfreezeSlot/:id").put(unfreezeSlot);

module.exports = router;