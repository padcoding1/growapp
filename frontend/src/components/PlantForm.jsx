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
    if (props.handleUpdatePlant) fetchPlant();
  }, [plantId, props.handleUpdatePlant]);

  const handleChange = (evt) => {
    setFormData({ ...formData, userPlantName: evt.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.handleUpdatePlant) {
      props.handleUpdatePlant(plantId, {
        userPlantName: event.target.userPlantName.value,
      });
    } else {
      props.handleCreatePlant({
        userPlantName: event.target.userPlantName.value,
        plantId: plantId,
      });
    }
  };
  return (
    <>
      <h1>{props.handleCreatePlant ? "Add plant" : "Update plant"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userPlantName">Name</label>
        <input
          type="text"
          id="userPlantName"
          name="userPlantName"
          value={formData.userPlantName}
          onChange={handleChange}
        />
        <button>{props.handleCreatePlant ? "Add" : "Update"}</button>
      </form>
    </>
  );
}

export default PlantForm;
