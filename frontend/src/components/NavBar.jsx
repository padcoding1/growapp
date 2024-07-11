import { Link } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext } from "react";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="text-2xl">GrowApp</h1>
        {user ? (
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/plants">Garden</Link>
              </li>
              <li>
                <Link to="/plants/new">Add Plant</Link>
              </li>
              <li>
                <Link to="" onClick={handleSignout}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
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
