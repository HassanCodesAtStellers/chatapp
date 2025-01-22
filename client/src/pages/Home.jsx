import React from "react";
import { LogoutBtn } from "../components";

const Home = () => {
  const isAuthenticated = localStorage.getItem("jwtToken");
  return isAuthenticated ? (
    <>
      <div>Home</div>
      <LogoutBtn />
    </>
  ) : (
    <>
      <div>Home</div>
      <h1>Not Authenticated</h1>
    </>
  );
};

export default Home;
