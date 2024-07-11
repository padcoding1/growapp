const User = require("../models/user");
const plantService = require("../services/plantService");

const searchPlant = async (req, res) => {
  try {
    const plants = await plantService.searchPlant(req.params.query);
    res.json(plants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.plants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plant = user.plants.id(req.params.plantId);
    res.status(200).json(plant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const plantData = await plantService.getPlant(req.body.plantId);
    const plantCare = await plantService.getPlantCare(req.body.plantId);
    const plant = {
      userPlantName: req.body.userPlantName,
      commonName: plantData.common_name,
      scientificName: plantData.scientific_name[0],
      wateringFrequency: plantData.watering,
      sunlight: plantData.sunlight[0],
      description: plantData.description,
      image: plantData.default_image.regular_url,
      wateringInfo: plantCare.data[0].section[0].description,
      sunlightInfo: plantCare.data[0].section[1].description,
    };
    user.plants.push(plant);
    await user.save();
    res.status(201).json(plant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const deletePlant = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const deletedPlant = user.plants.remove({ _id: req.params.plantId });
    await user.save();
    res.status(204).json(deletedPlant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, create, show, delete: deletePlant, searchPlant };
