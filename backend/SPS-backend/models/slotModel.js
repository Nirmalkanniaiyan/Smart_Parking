const mongoose = require("mongoose");

const slotSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    lotId:{
      type: String,
      required: [true, "Please add the lot Id"],
    },
    slotId: {
      type: String,
      required: [true, "Please add the slot number"],
    },
    status: {
      type: String,
      required: [true, "Please add the slot status"],
    },
    slotDetails: {
      type: String,
      required: [true, "Please add the slot details"],
    },
    bookedUser:{
      type:String,
    },
    startTime:{
      type:String,
    },
    endTime:{
      type:String,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);