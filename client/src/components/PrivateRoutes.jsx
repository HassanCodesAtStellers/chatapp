import React from 'react'
import {Navigate} from "react-router-dom"

const PrivateRoutes = ({children}) => {
 const isAuthenticated = !!localStorage.getItem('jwtToken');
 return isAuthenticated? children : <Navigate to="/signin" />;
}

export default PrivateRoutes;