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

  console.log(upcomingTasks);

  return (
    <main className="m-8">
      <div className="flex">
        <div className="w-2/3 border-r-2 border-green-600 p-4">
          <h1 className="m-8 text-4xl font-semibold text-green-600">Garden</h1>
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
        <div className="w-1/3 p-4">
          <h1 className="m-8 text-4xl font-semibold text-green-600">
            Upcoming Tasks
          </h1>
          <ScrollArea className="w-full rounded-md border p-4">
            <ul className="flex flex-wrap justify-center gap-8">
              {upcomingTasks.map((task) => (
                <li key={task._id}>
                  <Card className="h-48 w-96 text-green-600 shadow-md">
                    <CardHeader>
                      <CardTitle>{task.name}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{task.interval}</p>
                      <p>{task.timeOfDay}</p>
                    </CardContent>
                    <CardFooter className="text-xs">
                      Created at {new Date(task.createdAt).toLocaleString()}
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      <section>
        <h1>Notes</h1>

        {!props.comments.length && <p>There are no comments.</p>}

        {props.comments.map((comment) => (
          <article key={comment._id}>
            <header></header>
            <Dialog>
              <DialogTrigger asChild>
                <Link>{comment.text}</Link>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Note</DialogTitle>
                  <DialogDescription>{comment.text}</DialogDescription>
                  <DialogDescription>{comment.createdAt}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </article>
        ))}
      </section>
      <div className="flex w-full justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Note</Button>
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
        <Button onClick={() => props.handleDeleteComment(props.comment)}>
          Delete
        </Button>
      </div>
    </main>
  );
}

export default Garden;
