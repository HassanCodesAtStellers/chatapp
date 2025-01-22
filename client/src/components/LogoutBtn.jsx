import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../services/Api.jsx";

const LogoutBtn = () => {
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
  return <button onClick={handleOnSubmit}>Sign Out</button>;
};

export default LogoutBtn;
