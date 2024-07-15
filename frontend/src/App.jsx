import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Garden from "./components/Garden";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import * as authService from "../src/services/authService";
import * as plantService from "../src/services/plantService";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [plants, setPlants] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchPlants = async () => {
      const plants = await plantService.index();
      setPlants(plants);
    };
    if (user) fetchPlants();
  }, [user]);

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/plants" element={<Garden plants={plants} />} />
<<<<<<< Updated upstream
=======
              <Route path="/plants/:plantId" element={<PlantDetails handleDeletePlant={handleDeletePlant}/>} />
              <Route
                path="/plants/:plantId/edit"
                element={<PlantForm handleUpdatePlant={handleUpdatePlant} />}
              />
              \
>>>>>>> Stashed changes
              <Route path="/plants/new" />
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
