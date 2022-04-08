import React from "react";
import { Navigate } from "react-router-dom";


const AuthRequired = ({currentUser,children}) => {
    console.log(currentUser)
   return currentUser ?  <Navigate to='/' /> : children
}

export default AuthRequired;