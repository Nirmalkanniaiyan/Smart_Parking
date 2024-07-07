const mongoose = require("mongoose");

const lotSchema = mongoose.Schema(
    {
      lotId: {
        type: String,
        required: false,
      },
      lotName: {
        type: String,
        required: [true, "Please add the lot name"],
      },
      description: {
        type: String,
        required: [true, "Please add the lot description"],
      },
      coordinates: {
        type: String,
        required: [true, "Please add the lot coordinates"],
      },
      rating: {
        type: String,
        required: [true, "Please add the rating"],
      },
      votes: {
        type: String,
        required: [true, "Please add the votes"],
      },
      lotImageURL: {
        type: String,
        required: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Lot", lotSchema);
  