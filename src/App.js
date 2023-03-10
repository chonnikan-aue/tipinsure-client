import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import InsurancesTable from "./components/InsurancesTable/InsurancesTable";
import BuyInsurance from "./components/BuyInsurance/BuyInsurance";
import UserInfo from "./components/UserInfo/UserInfo";
import TipTrick from "./components/TipTrick/TipTrick";

function App() {
  const [userData, setUserData] = useState();
  const [loginData, setLoginData] = useState();
  const [insurancesOrigin, setInsurancesOrigin] = useState();
  const [insurances, setInsurances] = useState();
  const [buyData, setBuyData] = useState();

  const getUserData = () => {
    if (loginData) {
      let token = localStorage.getItem("jwt");
      axios
        .get(
          `${process.env.REACT_APP_API}/user/username/${loginData.username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getInsurances = (age) => {
    axios
      .get(`${process.env.REACT_APP_API}/insurance/age/${age}`)
      .then((res) => {
        setInsurancesOrigin(res.data);
        setInsurances(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserData();
  }, [loginData]);

  return (
    <div className="App">
      <Header
        userData={userData}
        setUserData={setUserData}
        setLoginData={setLoginData}
      />
      <Routes>
        <Route
          path="/"
          element={
            <InsurancesTable
              getInsurances={getInsurances}
              insurances={insurances}
              setInsurances={setInsurances}
              setBuyData={setBuyData}
              insurancesOrigin={insurancesOrigin}
            />
          }
        />
        <Route
          path="/buy"
          element={
            <BuyInsurance
              buyData={buyData}
              userData={userData}
              getUserData={getUserData}
            />
          }
        />
        <Route
          path="/user"
          element={<UserInfo userData={userData} setLoginData={setLoginData} />}
        />
        <Route path="/tip" element={<TipTrick />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
