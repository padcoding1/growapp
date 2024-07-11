const BASE_URL = "https://perenual.com/api/";
const key = process.env.PLANT_API_KEY;

const searchPlant = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}species-list?key=${key}&q=${query}`
    );
    const plants = await response.json();
    return plants;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPlant = async (plantId) => {
  try {
    const response = await fetch(
      `${BASE_URL}species/details/${plantId}?key=${key}`
    );
    const plant = await response.json();
    return plant;
  } catch (error) {
    console.log(error);
  }
};

const getPlantCare = async (plantId) => {
  try {
    const response = await fetch(
      `${BASE_URL}species-care-guide-list?species_id=${plantId}&key=${key}`
    );
    const plantCare = await response.json();
    return plantCare;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPlant,
  searchPlant,
  getPlantCare,
};
