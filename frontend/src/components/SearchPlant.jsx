import * as plantService from "../services/plantService";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchPlant() {
  const [formData, setFormData] = useState({
    search: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const plantData = await plantService.searchPlant(formData.search);
    const plants = plantData.data.filter((plant) => plant.id < 3001);
    setSearchResults(plants);
    setFormData({
      search: "",
    });
  };

  return (
    <>
      <main className="mx-4">
        <h1>Search Plant</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            onChange={handleChange}
            value={formData.search}
          />
          <button>Search</button>
        </form>

        <ul className="flex flex-wrap">
          {searchResults.length > 0 &&
            searchResults.map((plant) => (
              <li
                className="m-2 flex h-96 w-80 flex-col overflow-clip rounded-md border-2 border-black p-4"
                key={plant.id}
              >
                <Link to={`/plants/${plant.id}/create`}>
                  <h2 className="my-2 text-2xl">{plant.common_name}</h2>
                  <h3 className="relative top-64 my-2 text-xl text-white">
                    {plant.scientific_name}
                  </h3>
                  <img
                    className="size-64"
                    src={plant.default_image?.regular_url}
                    alt={plant.common_name}
                  />
                  <p>Watering Frequency: {plant.wateringFrequency}</p>
                  <p>Sunlight: {plant.sunlight}</p>
                  <p>{plant.description}</p>
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}

export default SearchPlant;
