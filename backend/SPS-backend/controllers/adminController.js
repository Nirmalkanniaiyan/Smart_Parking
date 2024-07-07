const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const Lot = require("../models/lotModel");
const Slot = require("../models/slotModel");

//@desc Register a admin
//@route POST /api/admin/auth/register
//@access public
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, lotName, description, coordinates, lotImageURL} = req.body;
  if (!username || !email || !password || !lotName || !description || !coordinates ) {
    console.log("All fields are mandatory!");
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await Admin.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Admin already registered!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  
  // Create admin with auto-assigned lotId
  const admin = await Admin.create({ username, email, password: hashedPassword });
  admin.lotId=admin.id
  // Create lot with auto-generated lotId
  console.log(admin.lotId);
  
    // Create lot with auto-generated lotId
    const lot = await Lot.create({ lotName, description, coordinates,rating:0,votes:0});
    
    lot.lotId=admin.id
    

    if(!lotImageURL){
      lot.lotImageURL="https://i.imgur.com/iQy8GLM.jpg";
    }
    else{
      lot.lotImageURL=lotImageURL;
    }
    console.log(lot.lotId);

    // Save the changes
    await lot.save();
  
  
  console.log(`Admin created ${admin}`);
  console.log(`Lot created ${lot}`);
  if (admin && lot) {
    res.status(201).json({ _id: admin.id, email: admin.email });
  } else {
    res.status(400);
    throw new Error("Admin data is not valid");
  }
});

//@desc Login admin
//@route POST /api/admin/auth/login
//@access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const admin = await Admin.findOne({ email });
  //compare password with hashedpassword
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: admin.username,
          email: admin.email,
          id: admin.id,
          lotId: admin.lotId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "150m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/admin/current
//@access private
const currentAdmin = asyncHandler(async (req, res) => {
  res.json(req.user);
});


//@desc Edit lot details
//@route PUT /api/admin/editLot
//@access private

const editLot = asyncHandler(async (req, res) => {
  const { lotName, description, coordinates , lotImageURL} = req.body;
  const lotId=req.user.lotId;


  // Find the lot associated with the provided lotId
  const lot = await Lot.findOne({ lotId });
  if (!lot) {
    res.status(404);
    throw new Error("Lot not found");
  }

  // Update the lot details
  if(lotName){
    lot.lotName = lotName;
  }
  if(description){
    lot.description = description;
  }
  if(coordinates){
    lot.coordinates = coordinates;
  }
  if(lotImageURL){
    lot.lotImageURL = lotImageURL;
  }

  // Save the changes
  await lot.save();

  res.status(200).json({ message: "Lot details updated successfully" });
});



//@desc Edit slot details
//@route PUT /api/admin/editSlot
//@access private

const editSlot = asyncHandler(async (req, res) => {
  const { slotId, status, slotDetails } = req.body;
  if (!slotId) {
    res.status(400);
    throw new Error("Slot ID is mandatory!");
  }

  // Find the slot associated with the provided slotId
  const slot = await Slot.findOne({ slotId });
  if (!slot) {
    res.status(404);
    throw new Error("Slot not found");
  }

  // Update the slot details
  if (status !== undefined) {
    slot.status = status;
  }
  if (slotDetails) {
    slot.slotDetails = slotDetails;
  }

  // Save the changes
  await slot.save();

  res.status(200).json({ message: "Slot details updated successfully" });
});

module.exports = { registerAdmin, loginAdmin, currentAdmin ,editLot,editSlot};