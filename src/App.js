import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";

function App() {
  const [userData, setUserData] = useState({username: "user"});
  return (
    <div className="App">
      <Header userData={userData} setUserData={setUserData} />
      {/* <Routes>
        <Route
          path="/"
          element={ 
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;