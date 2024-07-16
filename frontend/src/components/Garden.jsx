import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import placeholder from "../assets/placeholder.png";

function Garden(props) {
  return (
    <main className="mx-4">
      <h1 className="m-4 text-4xl font-semibold text-green-600">Garden</h1>
      <ul className="flex flex-wrap justify-center gap-8">
        {props.plants.map((plant) => (
          <Card
            className="h-96 w-96 overflow-hidden text-green-600 shadow-md"
            key={plant._id}
          >
            <Link to={`/plants/${plant._id}`}>
              <CardHeader>
                <CardTitle>{plant.userPlantName}</CardTitle>
                <CardDescription>{plant.commonName}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  className="h-48 w-full rounded-md object-cover"
                  src={plant.image || placeholder}
                  alt={plant.commonName}
                />
                <p className="truncate">{plant.description}</p>
              </CardContent>
              <CardFooter>
                <p>{plant.scientificName}</p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </ul>
    </main>
  );
}

export default Garden;
