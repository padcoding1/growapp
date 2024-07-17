import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Garden from "./components/Garden";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import PlantDetails from "./components/PlantDetails";
import SearchPlant from "./components/SearchPlant";
import * as authService from "../src/services/authService";
import * as plantService from "../src/services/plantService";
import * as taskService from "../src/services/taskService";
import * as commentService from "../src/services/commentService";
export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [plants, setPlants] = useState([]);
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchPlants = async () => {
      const plants = await plantService.index();
      setPlants(plants);
    };

    const fetchComment = async () => {
      const comments = await commentService.index();
      setComments(comments);
    };

    const fetchTasks = async () => {
      const tasks = await taskService.index();
      setTasks(tasks);
    };

    if (user) {
      fetchPlants();
      fetchComment();
      fetchTasks();
    }
  }, [user]);

  const handleUpdatePlant = async (plantId, plantFormData) => {
    const updatedPlant = await plantService.updatePlant(plantId, plantFormData);
    setPlants(
      plants.map((plant) =>
        plant._id === updatedPlant._id ? updatedPlant : plant,
      ),
    );

    navigate(`/plants/${plantId}`);
  };

  const handleDeletePlant = async (plantId) => {
    const deletedPlant = await plantService.deletePlant(plantId);
    setPlants(plants.filter((plant) => plant._id !== deletedPlant._id));
    navigate("/plants");
  };

  const handleCreatePlant = async (plantFormData) => {
    const newPlant = await plantService.createPlant(plantFormData);
    setPlants([...plants, newPlant]);
    navigate("/plants");
  };

  const handleAddComment = async (commentFormData) => {
    const newComment = await commentService.createComment(
      commentId,
      commentFormData,
    );
    setComment({ ...comment, comments: [...comment.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    const deletedComment = await commentService.deleteComment(
      commentId,
      commentId,
    );
    setComment({
      ...comment,
      comments: comment.comments.filter(
        (comment) => comment._id !== deletedComment._id,
      ),
    });
  };

  const handleCreateTask = async (taskFormData) => {
    const newTask = await taskService.createTask(taskFormData);
    setTasks([...tasks, newTask]);
    navigate("/plants");
  };

  const handleDeleteTask = async (taskId) => {
    await taskService.deleteTask(taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleUpdateTask = async (taskId, taskFormData) => {
    const updatedTask = await taskService.updateTask(taskId, taskFormData);
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)),
    );

    navigate("/plants");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route
                path="/plants"
                element={
                  <Garden plants={plants} comments={comments} tasks={tasks} />
                }
              />
              <Route
                path="/plants/:plantId"
                element={
                  <PlantDetails
                    handleDeletePlant={handleDeletePlant}
                    handleUpdatePlant={handleUpdatePlant}
                    tasks={tasks}
                    handleDeleteTask={handleDeleteTask}
                    handleUpdateTask={handleUpdateTask}
                  />
                }
              />
              <Route
                path="/plants/search"
                element={<SearchPlant handleCreatePlant={handleCreatePlant} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
