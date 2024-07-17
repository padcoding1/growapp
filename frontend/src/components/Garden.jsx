import { Link } from "react-router-dom";

import CommentForm from "./CommentForm";
import { ScrollArea } from "./ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import placeholder from "../assets/placeholder.png";

function Garden(props) {
  const date = new Date();
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date.toLocaleTimeString("en-US", {
    timeStyle: "short",
    hour12: false,
  });
  const dayOfMonth = date.getDate();

  const weekly = ["Sunday"];
  const biweekly = ["Sunday", "Wednesday"];
  const monthly = ["1"];

  const todaysTasks = props.tasks.filter((task) => {
    if (task.interval === "daily") {
      return true;
    } else if (task.interval === "weekly") {
      return weekly.includes(weekday);
    } else if (task.interval === "biweekly") {
      return biweekly.includes(weekday);
    } else if (task.interval === "monthly") {
      return monthly.includes(dayOfMonth);
    }
  });

  const upcomingTasks = todaysTasks.filter((task) => {
    if (task.timeOfDay === "morning") {
      return time < "12:00";
    } else if (task.timeOfDay === "afternoon") {
      return time >= "12:00" && time < "18:00";
    } else if (task.timeOfDay === "evening") {
      return time >= "18:00";
    }
  });

  return (
    <main className="m-4">
      <div className="flex">
        <div className="w-2/3 p-4">
          <h1 className="my-8 text-4xl font-semibold text-green-600">Garden</h1>
          <ul className="flex flex-wrap justify-center gap-8">
            {props.plants.map((plant) => (
              <Card
                className="h-96 w-80 overflow-hidden text-green-600 shadow-md"
                key={plant._id}
              >
                <Link to={`/plants/${plant._id}`}>
                  <CardHeader>
                    <CardTitle>{plant.userPlantName}</CardTitle>
                    <CardDescription>{plant.commonName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      className="mb-2 h-48 w-full rounded-md object-cover"
                      src={plant.image || placeholder}
                      alt={plant.commonName}
                    />
                    <p className="truncate">{plant.description}</p>
                  </CardContent>
                  <CardFooter className="text-sm">
                    {plant.scientificName}
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </ul>
        </div>
        <div className="flex w-1/3 flex-col p-4">
          <h1 className="my-8 text-4xl font-semibold text-green-600">
            Upcoming Tasks Today
          </h1>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-md">
            <ul className="flex flex-wrap justify-center gap-8">
              {upcomingTasks && upcomingTasks.length === 0 && (
                <p className="my-24 text-lg font-semibold text-green-600">
                  There are no tasks today.
                </p>
              )}
              {upcomingTasks.map((task) => (
                <Link
                  to={`/plants/${task.plant}`}
                  key={task._id}
                  className="h-48 w-full rounded-md text-green-600 shadow-md"
                >
                  <Card className="h-full text-green-600">
                    <CardHeader>
                      <CardTitle>{task.name}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{task.timeOfDay}</p>
                    </CardContent>
                    <CardFooter className="text-xs">
                      Created at {new Date(task.createdAt).toLocaleString()}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </ul>
          </ScrollArea>
          <h1 className="my-8 text-4xl font-semibold text-green-600">Notes</h1>

          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-md">
            <ul className="h-full">
              {props.comments && props.comments.length === 0 && (
                <p className="my-24 text-center text-lg font-semibold text-green-600">
                  There are no notes.
                </p>
              )}

              {props.comments.map((comment) => (
                <li
                  key={comment._id}
                  className="my-2 flex h-24 items-center justify-between rounded-md border p-4 text-green-600 shadow-md"
                >
                  <p className="w-1/3">{comment.text}</p>
                  <p className="text-xs">
                    Created at{" "}
                    {new Date(comment.createdAt).toLocaleString().split(",")[0]}
                  </p>
                  <Button
                    onClick={() => props.handleDeleteComment(comment._id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="m-2 w-24 self-center">Add Note</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
                <DialogDescription>
                  Add a note on how your garden is doing!
                </DialogDescription>
              </DialogHeader>
              <CommentForm handleAddComment={props.handleAddComment} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}

export default Garden;
