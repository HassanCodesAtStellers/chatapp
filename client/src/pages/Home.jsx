import React from "react";
import { LogoutBtn } from "../components";
import { NavLink } from "react-router-dom";

const Home = () => {
  const isAuthenticated = localStorage.getItem("jwtToken");
  return isAuthenticated ? (
    <>
      <div>Home</div>
      <LogoutBtn />
      <NavLink to={"/dashboard"}>Dasbboard</NavLink>
      <NavLink to={"/chat-room"}>Chat Room</NavLink>
    </>
  ) : (
    <>
      <div>Home</div>
      <h1>Not Authenticated</h1>
    </>
  );
};

export default Home;
