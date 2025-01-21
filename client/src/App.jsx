import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import {Home, NotFound,Signin, Register} from "./pages"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  )
}

export default App