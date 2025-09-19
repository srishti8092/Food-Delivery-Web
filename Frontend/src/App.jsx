import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
export const serverUrl = "http://localhost:5000";

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  )
}

export default App