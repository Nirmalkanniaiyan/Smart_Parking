const asyncHandler = require("express-async-handler");

const Admin = require("../models/authModel");
const Lot = require("../models/lotModel");
const Slot = require("../models/slotModel");

//@desc Get lot details
//@route GET /api/user/getLotDetails/:id
//@access public

const getLotDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Lot ID is required");
  }
  const lot = await Lot.findOne({ lotId: id });
  if (!lot) {
    res.status(404);
    throw new Error("Lot not found");
  }

  res.status(200).json(lot);
});

  
//@desc Show nearby lots
//@route POST /api/user/showNearbyLots
//@access public

// Import necessary functions from 'math' module
const { cos, asin, sqrt, PI } = Math;

// Define the distance function
function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // Earth's radius in km
  const p = Math.PI / 180; // Convert degrees to radians

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lon2 - lon1) * p)) / 2;
  return 2 * r * Math.asin(Math.sqrt(a));
}

const showNearbyLots = asyncHandler(async (req, res) => {
    const { coordinates } = req.body;
    if (!coordinates) {
      res.status(400);
      throw new Error("Coordinates are required");
    }
  
    // Parse coordinates string to latitude and longitude
    const [givenLatitude, givenLongitude] = coordinates.split(" ").map(Number);
  
    // Find all lots
    const lots = await Lot.find();
  
    // Calculate distance between the given coordinates and each lot's coordinates
    lots.forEach(lot => {
      const [latitude, longitude] = lot.coordinates.split(" ").map(Number);
      const dist = distance(givenLatitude, givenLongitude, latitude, longitude);
      lot.distance = dist;
  });
  
    // Sort lots based on distance in ascending order
    lots.sort((a, b) => a.distance - b.distance);
  
    
    // Return the top 5 nearest lots with distance included
    const nearbyLots = lots.slice(0, 5).map(lot => ({
      lot: lot,
      distance: lot.distance.toFixed(1),
      rating: lot.rating, 
      votes: lot.votes ,
      lotId:lot.lotId,
    }));
    console.log(nearbyLots);
    res.status(200).json(nearbyLots);
  });
  

  //@desc Get slot details
  //@route GET /api/user/getSlotDetails/:id
  //@access public
  
  const getSlotDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      throw new Error("Slot ID is required");
    }
  
    const slot = await Slot.findOne({ slotId: id });
    if (!slot) {
      res.status(404);
      throw new Error("Slot not found");
    }
  
    res.status(200).json(slot);
  });
  

  

//@desc Get a free slot and freeze it
//@route GET /api/user/getFreeSlot/:id
//@access private

const getFreeSlot = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const freeSlot = await Slot.findOne({ lotId:req.params.id, status: "0" });
  console.log(freeSlot);
  if (!freeSlot) {
    res.status(404);
    throw new Error("No free slot available");
  }
  
  // Find if there is any booked slot already for the user
  const bookedSlot = await Slot.findOne({ bookedUser: userId });
  if (bookedSlot) {
    res.status(400).json({ "MESSAGE" : "You already booked a slot"});
  }

  freeSlot.bookedUser = userId;
  freeSlot.startTime = new Date().toISOString();

  freeSlot.status = "1"; 
  await freeSlot.save();

  res.status(200).json({ slotId: freeSlot.slotId });
});



//@desc Get price for a booked slot and free it
//@route GET /api/user/getPrice
//@access private

const getPrice = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Find the booked slot for the user
  const bookedSlot = await Slot.findOne({ bookedUser: userId });

  if (!bookedSlot) {
    res.status(401).json({ "MESSAGE": "No booked slot found for the user"});
  }

  // Calculate the duration the slot was booked for
  const startTime = new Date(bookedSlot.startTime);
  const currentTime = new Date();
  const durationInMilliseconds = currentTime - startTime;
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

  // Calculate the price based on the duration
  const price = (durationInHours * 100).toFixed(3); // Assuming Rs. 100 per hour

  // Update slot details
  bookedSlot.status = "0"; // Set status back to "0" to mark the slot as free
  bookedSlot.bookedUser = null; // Reset bookedUser field
  bookedSlot.startTime = null; // Reset startTime field

  // Save the updated slot details
  await bookedSlot.save();

  res.status(200).json({ price });
});



//@desc Give ratings for a lot
//@route POST /api/user/rateLot
//@access public

const rateLot = asyncHandler(async (req, res) => {
  const { lotId,userRating } = req.body;
  if (!userRating || !lotId) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  // Find the lot associated with the provided lotId
  const lot = await Lot.findOne({ lotId });
  if (!lot) {
    res.status(404);
    throw new Error("Lot not found");
  }

  const currRating=parseFloat(lot.rating);
  const currVotes=parseFloat(lot.votes);
  
  console.log(((currRating*currVotes)+userRating)/(currVotes+1).toString());
  lot.rating=(((currRating*currVotes)+userRating)/(currVotes+1)).toFixed(1).toString();
  lot.votes=(currVotes+1).toString();
  
  // Save the changes
  await lot.save();

  res.status(200).json({ rating: lot.rating , votes:lot.votes });

});




module.exports = { getLotDetails,showNearbyLots,getSlotDetails,getFreeSlot,getPrice,rateLot};