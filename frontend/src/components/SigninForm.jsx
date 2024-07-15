import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Log In</h1>
      <p>{message}</p>
      <form
        className="flex flex-col gap-4"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Username:</label>
          <input
            className="rounded-md border-2 border-black"
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            className="rounded-md border-2 border-black"
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="rou rounded-md border-2 border-black px-2 py-1">
            Log In
          </button>
          <Link to="/">
            <button className="rou rounded-md border-2 border-black px-2 py-1">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SigninForm;
