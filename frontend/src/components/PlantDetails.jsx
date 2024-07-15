import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as plantService from "../services/plantService";

function PlantDetails(props) {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      const plant = await plantService.showPlant(plantId);
      setPlant(plant);
    };
    fetchPlant();
  }, [plantId]);

  return (
    <>
      {plant && (
        <div id={plant._id}>
          <h1>{plant.userPlantName}</h1>
          <h2>{plant.commonName}</h2>
          <h2>{plant.scientificName}</h2>
          <img className="size-72" src={plant.image} alt={plant.commonName} />
          <p>{plant.description}</p>
          <p>Watering: {plant.wateringFrequency}</p>
          <p>{plant.wateringInfo}</p>
          <p>Sunlight: {plant.sunlight}</p>
          <p>{plant.sunlightInfo}</p>
          <Link to={`/plants/${plant._id}/edit`}>Edit</Link>
          <button onClick={() => props.handleDeletePlant(plantId)}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default PlantDetails;
