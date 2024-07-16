import { Link } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext } from "react";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      <div className="flex items-center justify-between border-b-2 px-4 py-6 text-green-600 shadow-md">
        <Link to="/">
          <h1 className="text-4xl font-semibold">GrowApp</h1>
        </Link>
        {user ? (
          <nav className="text-lg">
            <ul className="flex gap-4">
              <li className="transition-all hover:scale-105">
                <Link to="/">Home</Link>
              </li>
              <li className="transition-all hover:scale-105">
                <Link to="/plants">Garden</Link>
              </li>
              <li className="transition-all hover:scale-105">
                <Link to="/plants/search">Add Plant</Link>
              </li>
              <li className="transition-all hover:scale-105">
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="text-lg">
            <ul className="flex gap-4">
              <li className="transition-all hover:scale-105">
                <Link to="/signin">Log In</Link>
              </li>
              <li className="transition-all hover:scale-105">
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("my-section");
                    element?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  FAQ
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
export default NavBar;
