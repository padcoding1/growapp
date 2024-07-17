import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as plantService from "../services/plantService";
import placeholder from "../assets/placeholder.png";
import { Button } from "./ui/button";
import PlantForm from "./PlantForm";
import TaskForm from "./TaskForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

function PlantDetails(props) {
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      const plant = await plantService.showPlant(plantId);
      setPlant(plant);
    };
    fetchPlant();
  }, [plantId, plant]);

  return (
    <>
      <main className="flex items-center justify-center">
        {plant && (
          <div
            id={plant._id}
            className="m-8 flex w-2/3 flex-col items-center justify-center gap-8 lg:w-1/3"
          >
            <h1 className="text-4xl font-semibold text-green-600">
              {plant.userPlantName}
            </h1>
            <h2 className="text-2xl text-green-600">{plant.commonName}</h2>
            <h2>{plant.scientificName}</h2>
            <img
              className="h-96 w-96 rounded-md object-cover"
              src={plant.image || placeholder}
              alt={plant.commonName}
            />
            <p>{plant.description}</p>
            <div>
              <p className="text-lg font-semibold text-green-600">
                Watering: {plant.wateringFrequency}
              </p>
              <p>{plant.wateringInfo}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-green-600">
                Sunlight: {plant.sunlight}
              </p>
              <p>{plant.sunlightInfo}</p>
            </div>

            <div className="flex w-full justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Update</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename</DialogTitle>
                    <DialogDescription>
                      Update the name of your plant
                    </DialogDescription>
                  </DialogHeader>
                  <PlantForm
                    handleUpdatePlant={props.handleUpdatePlant}
                    plantId={plant._id}
                  />
                </DialogContent>
              </Dialog>
              <Button onClick={() => props.handleDeletePlant(plantId)}>
                Delete
              </Button>
            </div>
            <div className="w-full">
              <h3 className="m-4 text-center text-4xl font-semibold text-green-600">
                Tasks
              </h3>
              {props.tasks.filter((task) => task.plant === plant._id).length ===
              0 ? (
                <p className="mt-8 text-center font-semibold text-green-600">
                  No tasks for this plant
                </p>
              ) : (
                <></>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="my-8">Create Task</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogDescription>
                      Create a new task for your plant
                    </DialogDescription>
                  </DialogHeader>
                  <TaskForm
                    handleCreateTask={props.handleCreateTask}
                    plantId={plant._id}
                  />
                </DialogContent>
              </Dialog>

              <ul className="flex flex-col items-center gap-4">
                {props.tasks
                  .filter((task) => task.plant === plant._id)
                  .map((task) => (
                    <Card
                      key={task._id}
                      className="w-96 overflow-hidden text-center text-green-600 shadow-md"
                    >
                      <CardHeader>
                        <CardTitle>{task.name}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>Interval: {task.interval}</p>
                        <p>Time of Day: {task.timeOfDay}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full justify-between">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button>Update</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Task</DialogTitle>
                                <DialogDescription>
                                  Update the task for your plant
                                </DialogDescription>
                              </DialogHeader>
                              <TaskForm
                                handleUpdateTask={props.handleUpdateTask}
                                taskId={task._id}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            onClick={() => props.handleDeleteTask(task._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default PlantDetails;
