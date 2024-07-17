import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DialogClose } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function TaskForm(props) {
  const taskId = props.taskId;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    interval: "",
    timeOfDay: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const task = await taskService.showTask(taskId);
      setFormData({
        name: task.name,
        description: task.description,
        interval: task.interval,
        timeOfDay: task.timeOfDay,
      });
    };
    if (props.handleUpdateTask) fetchTask();
  }, [taskId, props.handleUpdateTask]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.handleUpdateTask) {
      props.handleUpdateTask(taskId, { formData });
      setFormData({
        name: "",
        description: "",
        interval: "",
        timeOfDay: "",
      });
    } else {
      props.handleCreateTask({
        name: event.target.name.value,
        description: event.target.description.value,
        interval: event.target.interval.value,
        timeOfDay: event.target.timeOfDay.value,
        plant: props.plantId,
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
          <Label htmlFor="name" className="sr-only">
            Name
          </Label>
          <Input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Task Name"
          />
          <Label htmlFor="description" className="sr-only">
            Description
          </Label>
          <Input
            required
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="biweekly">Biweekly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time of Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </main>
    </>
  );
}

export default TaskForm;
