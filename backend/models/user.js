const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  measureUnits: {
    type: String,
    required: true,
    enum: ["metric", "imperial"],
  },
  tempUnits: {
    type: String,
    required: true,
    enum: ["C", "F"],
  },
});

const plantsSchema = new mongoose.Schema(
  {
    userPlantName: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    commonName: {
      type: String,
      required: true,
    },
    wateringFrequency: {
      type: String,
      required: true,
    },
    wateringPeriod: {
      type: String,
    },
    sunlight: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  settings: [settingsSchema],
  plants: [plantsSchema],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
