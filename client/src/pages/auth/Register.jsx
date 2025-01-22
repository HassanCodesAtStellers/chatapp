import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/Api.jsx";

const Register = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      // console.log(userData);
    } catch (error) {
      console.error(error.meassage);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      alert("user registered successfully");
      navigate("/signin");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <form method="POST" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleOnChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleOnChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
