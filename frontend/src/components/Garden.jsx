import { Link } from "react-router-dom";

function Garden(props) {
  return (
    <main className="mx-4">
      <h1>Garden</h1>
      <ul className="flex flex-wrap">
        {props.plants.map((plant) => (
          <li
            className="m-2 flex h-96 w-80 flex-col overflow-clip rounded-md border-2 border-black p-4"
            key={plant._id}
          >
            <Link to={`/plants/${plant._id}`}>
              <h2 className="my-2 text-2xl">{plant.userPlantName}</h2>
              <h3 className="relative top-64 my-2 text-xl text-white">
                {plant.commonName}
              </h3>
              <img
                className="size-64"
                src={plant.image}
                alt={plant.commonName}
              />
              <p>Watering Frequency: {plant.wateringFrequency}</p>
              <p>Sunlight: {plant.sunlight}</p>
              <p>{plant.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Garden;
