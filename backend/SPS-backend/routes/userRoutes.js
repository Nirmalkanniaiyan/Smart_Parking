const express = require("express");
const router = express.Router();
const {
    getLotDetails,
    showNearbyLots,
    getSlotDetails,
    getFreeSlot,
    getPrice,
    rateLot,
} = require("../controllers/userController");

router.route("/getLotDetails/:id").get(getLotDetails);

router.route("/getSlotDetails/:id").get(getSlotDetails);

router.route("/showNearbyLots").post(showNearbyLots);

router.route("/rateLot").post(rateLot);

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/getFreeSlot/:id").get(getFreeSlot);

router.route("/getPrice").get(getPrice);

module.exports = router;