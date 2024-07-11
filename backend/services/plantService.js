const BASE_URL = "https://perenual.com/api/";

const searchPlant = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}species-list?key=${process.env.PLANT_API_KEY}&q=${query}`
    );
    const plants = await response.json();
    return plants;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getPLant = async (plantId) => {
  try {
    const response = await fetch(
      `${BASE_URL}species/details/${plantId}?key=${process.env.PLANT_API_KEY}`
    );
    const plant = await response.json();
    return plant;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPLant,
  searchPlant,
};
