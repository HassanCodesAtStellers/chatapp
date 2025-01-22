import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Dashboard, NotFound, Signin, Register } from "./pages";
import { PrivateRoutes } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
