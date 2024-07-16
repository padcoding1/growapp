import * as plantService from "../services/plantService";
import placeholder from "../assets/placeholder.png";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import PlantForm from "./PlantForm";

function SearchPlant(props) {
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
        <h1 className="m-8 text-center text-4xl font-semibold text-green-600">
          Search Plants
        </h1>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-1/3 items-center justify-center gap-8"
          >
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <Input
              type="text"
              id="search"
              name="search"
              onChange={handleChange}
              value={formData.search}
              placeholder="Search for a plant"
            />
            <Button>Search</Button>
          </form>
          <ul className="flex flex-wrap justify-center gap-8 p-8">
            {searchResults.length > 0 ? (
              searchResults.map((plant) => (
                <Card
                  className="h-96 w-96 overflow-hidden text-green-600 shadow-md"
                  key={plant.id}
                >
                  <CardHeader>
                    <CardTitle>{plant.common_name}</CardTitle>
                    <CardDescription>{plant.scientific_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      className="h-48 w-full rounded-md object-cover"
                      src={plant.default_image?.regular_url || placeholder}
                      alt={plant.common_name}
                    />
                    <p className="truncate">{plant.family_common_name}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p>{plant.scientific_name}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add to plants</DialogTitle>
                          <DialogDescription>
                            Add this plant to your garden
                          </DialogDescription>
                        </DialogHeader>
                        <PlantForm
                          handleCreatePlant={props.handleCreatePlant}
                          plantId={plant.id}
                        />
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="m-24 text-lg text-green-600">No results found</p>
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default SearchPlant;
