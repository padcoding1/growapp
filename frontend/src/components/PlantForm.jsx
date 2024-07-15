import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as plantService from "../services/plantService";

function PlantForm(props) {
  const { plantId } = useParams();

  const [formData, setFormData] = useState({
    userPlantName: "",
  });

  useEffect(() => {
    const fetchPlant = async () => {
      const plant = await plantService.showPlant(plantId);
      setFormData({ userPlantName: plant.userPlantName });
    };
    fetchPlant();
  }, [plantId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.handleUpdatePlant(plantId, {
      userPlantName: event.target.userPlantName.value,
    });
  };
  return (
    <>
      <h1>Update plant</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userPlantName">Name</label>
        <input
          type="text"
          id="userPlantName"
          name="userPlantName"
          value={formData.userPlantName}
          onChange={handleChange}
        />
        <button>Update</button>
      </form>
    </>
  );
}

export default PlantForm;
