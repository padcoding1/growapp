import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import * as authService from "../src/services/authService";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/plants" />
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
