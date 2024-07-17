import { useState, useEffect } from "react";
import * as taskService from "../services/taskService";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DialogClose } from "./ui/dialog";

function TaskForm(props) {
  const taskId = props.taskId;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    interval: "interval",
    timeOfDay: "timeOfDay",
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
      props.handleUpdateTask(taskId, formData);
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
          className="flex w-full flex-col items-center gap-4"
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

          <select
            className="w-1/2 rounded-md border border-gray-300 bg-white p-2 text-gray-500"
            name="interval"
            id="interval"
            onChange={handleChange}
            value={formData.interval}
          >
            <option className="" value="interval">
              Interval
            </option>
            <option value="daily">Daily</option>
            <option value="biweekly">Biweekly</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            className="w-1/2 rounded-md border border-gray-300 bg-white p-2 text-gray-500"
            name="timeOfDay"
            id="timeOfDay"
            onChange={handleChange}
            value={formData.timeOfDay}
          >
            <option value="timeOfDay">Time of Day</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </main>
    </>
  );
}

export default TaskForm;
