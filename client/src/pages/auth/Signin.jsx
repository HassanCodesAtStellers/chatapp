import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../../services/Api.jsx";

const Signin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    try {
      setUserData({ ...userData, [e.target.name]: e.target.value });
      // console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signinUser(userData);
      console.log(response);
      localStorage.setItem("jwtToken", response.jwtToken);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <form method="POST" onSubmit={handleOnSubmit}>
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
        <button type="submit">Signin</button>
      </form>
    </>
  );
};

export default Signin;
