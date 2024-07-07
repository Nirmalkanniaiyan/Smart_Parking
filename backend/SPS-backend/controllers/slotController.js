const asyncHandler = require("express-async-handler");
const Slot = require("../models/slotModel");

//@desc Get all slots
//@route GET /api/admin/slot/getAllSlots
//@access private
const getAllSlots = asyncHandler(async (req, res) => {

  console.log(req);

  // const {userId} = req.body;
  // const slots = await Slot.find({ user_id: userId });

  const slots = await Slot.find({ user_id: req.user.id });
  res.status(200).json(slots);
});

//@desc Create New slot
//@route POST /api/admin/slot/createSlot
//@access private
const createSlot = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { slotId, status, slotDetails } = req.body;
  if ( !slotId || !status || !slotDetails ) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const lotId=req.user.id
  
  // Check if a slot with the same slotId already exists
  const existingSlot = await Slot.findOne({ slotId, lotId });

  if (existingSlot) {
    res.status(400).json({ message: "Slot already present" });
    return;
  }
 
  const slot = await Slot.create({
    lotId,
    slotId,
    status,
    slotDetails,
    user_id: req.user.id,
  });
  console.log("check");

  
  res.status(201).json(slot);
});

//@desc Get slot
//@route GET /api/admin/slot/getSlot/:id
//@access private
const getSlot = asyncHandler(async (req, res) => {
  console.log(req.user.lotId);
  console.log("check");
  const slot = await Slot.findOne({ slotId: req.params.id });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }
  res.status(200).json(slot);
});

//@desc Update slot
//@route PUT /api/admin/slot/updateSlot/:id
//@access private
const updateSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findOne({ slotId: req.params.id });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  if (slot.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Admin don't have permission to update other parking lot's Slots");
  }

  const updatedSlot = await Slot.findOneAndUpdate(
    { slotId: req.params.id },
    req.body,
    { new: true }
  );
  

  res.status(200).json(updatedSlot);
});

//@desc Delete slot
//@route DELETE /api/admin/slot/deleteSlot/:id
//@access private
const deleteSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findOne({ slotId: req.params.id });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }
  if (slot.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Admin don't have permission to update other parking lot's slots");
  }
  await Slot.deleteOne({ slotId: req.params.id });
  res.status(200).json(slot);
});


//@desc Get all free slots
//@route GET /api/admin/slot/getAllFreeSlots
//@access private
const getAllFreeSlots = asyncHandler(async (req, res) => {
  const freeSlots = await Slot.find({ user_id: req.user.id ,status: "0" });
  res.status(200).json(freeSlots);
});

//@desc Get all closed slots
//@route GET /api/admin/slot/getAllClosedSlots
//@access private
const getAllClosedSlots = asyncHandler(async (req, res) => {
  const closedSlots = await Slot.find({ user_id: req.user.id , status: "1" });
  res.status(200).json(closedSlots);
});

//@desc Freeze a slot
//@route PUT /api/admin/slot/freezeSlot/:id
//@access private
const freezeSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findOne({ user_id: req.user.id , slotId: req.params.id });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }
  // Check if the slot is already closed
  if (slot.status === "1") {
    res.status(400);
    throw new Error("Slot already closed");
  }
  // Check if the slot is already frozen
  if (slot.status === "2") {
    res.status(400);
    throw new Error("Slot already frozen");
  }


  // Update the status of the slot to 1 (filled)
  const updatedSlot = await Slot.findOneAndUpdate(
    { slotId: req.params.id, status: "0" },
    { status: "2" },
    { new: true }
  );

  
  slot.status="2";
  await slot.save();
  res.status(200).json(updatedSlot);
});

//@desc Unfreeze a slot
//@route PUT /api/admin/slot/unfreezeSlot/:id
//@access private
const unfreezeSlot = asyncHandler(async (req, res) => {
  const slot = await Slot.findOne({ user_id: req.user.id ,slotId: req.params.id });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  console.log(slot.toString());
  // Check if the slot is already empty
  if (slot.status === "0") {
    res.status(400);
    throw new Error("Slot is already free");
  }
  // Check if the slot is already in closed state
  if (slot.status === "0") {
    res.status(400);
    throw new Error("Slot is in closed state");
  }

  
  // Update the status of the slot to 0 (unfilled)
  const updatedSlot = await Slot.findOneAndUpdate(
    { slotId: req.params.id, status: "1" },
    { status: "0" },
    { new: true }
  );
  slot.status="0";
  await slot.save();
  res.status(200).json(slot);
});


module.exports = {
  getAllSlots,
  getSlot,

  createSlot,
  updateSlot,
  deleteSlot,
  
  getAllFreeSlots,
  getAllClosedSlots,
  
  freezeSlot,
  unfreezeSlot,
};