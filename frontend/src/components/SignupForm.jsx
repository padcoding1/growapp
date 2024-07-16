import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import leaves from "../assets/leaves2.jpg";
import * as authService from "../services/authService";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="flex h-screen w-full">
      <img
        src={leaves}
        alt="leaves"
        className="hidden h-full w-3/5 object-cover sm:block md:block lg:block xl:block"
      />
      <div className="flex h-full w-full flex-col items-center justify-center sm:w-2/5">
        <form
          onSubmit={handleSubmit}
          className="b flex flex-col gap-4 rounded-md p-8 shadow-md"
        >
          <h1 className="text-xl font-semibold">Sign Up</h1>
          <p className="text-red-600">{message}</p>
          <div>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="confirm">Confirm Password:</Label>
            <Input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>
          <div className="my-8 flex w-full justify-between">
            <Button
              className="rou rounded-md border-2 border-black px-2 py-1"
              disabled={isFormInvalid()}
            >
              Sign Up
            </Button>
            <Link to="/">
              <Button className="rou rounded-md border-2 border-black px-2 py-1">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
