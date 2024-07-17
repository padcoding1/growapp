import { useState, useEffect } from "react";
import * as plantService from "../services/plantService";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DialogClose } from "./ui/dialog";

function PlantForm(props) {
  const plantId = props.plantId;

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
      setFormData({ userPlantName: "" });
    } else {
      props.handleCreatePlant({
        userPlantName: event.target.userPlantName.value,
        plantId: plantId,
      });
    }
  };
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <form
          className="flex w-full items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Label htmlFor="userPlantName" className="sr-only">
            Name
          </Label>
          <Input
            required
            type="text"
            id="userPlantName"
            name="userPlantName"
            value={formData.userPlantName}
            onChange={handleChange}
            placeholder="Plant Name"
          />
          <DialogClose asChild>
            <Button type="submit">
              {props.handleCreatePlant ? "Add" : "Update"}
            </Button>
          </DialogClose>
        </form>
      </main>
    </>
  );
}

export default PlantForm;
