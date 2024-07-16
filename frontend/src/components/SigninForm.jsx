import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import leaves from "../assets/leaves.jpg";
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
    <main className="flex h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center sm:w-2/5">
        <form
          className="b flex flex-col gap-4 rounded-md p-8 shadow-md"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-semibold">Log In</h1>
          <p className="text-sm text-red-600">{message}</p>
          <div>
            <Label htmlFor="email">Username:</Label>
            <Input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="my-8 flex w-full justify-between">
            <Button>Log In</Button>
            <Link to="/">
              <Button>Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
      <img
        src={leaves}
        alt="leaves"
        className="s hidden h-full w-3/5 object-cover sm:block md:block lg:block xl:block"
      />
    </main>
  );
};

export default SigninForm;
