import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../services/Api.jsx";

const Home = () => {
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      const response = await signOutUser();

      if (response) {
        localStorage.removeItem("jwtToken");
        console.log("user Logged out successfully");
        navigate("/signin");
      }
    } catch (error) {
      console.error(
        "Error during sign out:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to log out.");
    }
  };
  return (
    <>
      <div>Home</div>
      <button onClick={handleOnSubmit}>Sign Out</button>
    </>
  );
};

export default Home;
