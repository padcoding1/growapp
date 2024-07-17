import { Link } from "react-router-dom";

import CommentForm from "./CommentForm";
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
  return (
    <>



    <main className="mx-4">
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
      <section>
        <h1>Notes</h1>

        {!props.comments.length && <p>There are no comments.</p>}

        {props.comments.map((comment) => (
          <article key={comment._id}>
            <header>
            </header>
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
            <CommentForm
              handleAddComment={props.handleAddComment}
            />
          </DialogContent>
        </Dialog>
        <Button onClick={() => props.handleDeleteComment(props.comment)}>
          Delete
        </Button>
      </div>
    </main>
    </>
  );
}

export default Garden;
