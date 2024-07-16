import { Link } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext } from "react";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      <div className="flex items-center justify-between border-b-2 p-4 text-green-600 shadow-md">
        <Link to="/">
          <h1 className="text-3xl font-semibold">GrowApp</h1>
        </Link>
        {user ? (
          <nav>
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
          <nav>
            <ul className="flex gap-4">
              <li className="transition-all hover:scale-105">
                <Link to="/signin">Log In</Link>
              </li>
              <li className="transition-all hover:scale-105">
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};
export default NavBar;
