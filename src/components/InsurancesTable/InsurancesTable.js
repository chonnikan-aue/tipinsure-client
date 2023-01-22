import React, { useState, useEffect, useRef } from "react";
import "./InsurancesTable.css";
import { Container, FloatingLabel, Form, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const InsurancesTable = (props) => {
  const navigate = useNavigate();
  const input = useRef();
  const [data, setData] = useState();
  const [age, setAge] = useState();
  const [insuranceCount, setInsuranceCount] = useState();
  const [compareDiv, setCompareDiv] = useState();
  const [nameDiv, setNameDiv] = useState();
  const [covidPriceDiv, setCovidPriceDiv] = useState();
  const [nonCovidPriceDiv, setNonCovidPriceDiv] = useState();
  const [maxPerYearDiv, setMaxPerYearDiv] = useState();
  const [maxPerTimeDiv, setMaxPerTimeDiv] = useState();
  const [normalRoomDiv, setNormalRoomDiv] = useState();
  const [IcuRoomDiv, setIcuRoomDiv] = useState();
  const [genMedExpDiv, setGenMedExpDiv] = useState();
  const [emerMedExpDiv, setEmerMedExpDiv] = useState();
  const [crfDiv, setCrfDiv] = useState();
  const [cancerDiv, setCancerDiv] = useState();
  const [ambulanceDiv, setAmbulanceDiv] = useState();
  const [normalIncomeDiv, setNormalIncomeDiv] = useState();
  const [icuIncomeDiv, setIcuIncomeDiv] = useState();
  const [surgicalDiv, setSurgicalDiv] = useState();
  const [opdDiv, setOpdDiv] = useState();
  const [deathDiv, setDeathDiv] = useState();
  const [healthCheckDiv, setHealthCheckDiv] = useState();
  const [dentistDiv, setDentistDiv] = useState();

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getDiv = (attr) => {
    const div = props.insurances.map((insurance, index) => {
      if (insurance.Insurance[`${attr}`] === 0) {
        return (
          <td key={index}>
            Actual pay, not exceed{" "}
            {insurance.Insurance.maxMedExpensePerTime.toLocaleString("en-US")}
            <br />
            {index !== 0 && (
              <>
                {insurance.Insurance.maxMedExpensePerTime -
                  props.insurances[0].Insurance.maxMedExpensePerTime >=
                0 ? (
                  <span className="insurance-up">
                    (+
                    {(
                      insurance.Insurance.maxMedExpensePerTime -
                      props.insurances[0].Insurance.maxMedExpensePerTime
                    ).toLocaleString("en-US")}
                    )
                  </span>
                ) : (
                  <span className="insurance-down">
                    (
                    {(
                      insurance.Insurance.maxMedExpensePerTime -
                      props.insurances[0].Insurance.maxMedExpensePerTime
                    ).toLocaleString("en-US")}
                    )
                  </span>
                )}
              </>
            )}
          </td>
        );
      } else if (!insurance.Insurance[`${attr}`]) {
        return (
          <td key={index}>
            -
            <br />
            {index !== 0 && (
              <>
                {!(
                  insurance.Insurance[`${attr}`] &&
                  props.insurances[0].Insurance[`${attr}`]
                ) ? (
                  <span className="insurance-up">(+0)</span>
                ) : (
                  <span className="insurance-down">
                    (-
                    {props.insurances[0].Insurance.maxMedExpensePerTime.toLocaleString(
                      "en-US"
                    )}
                    )
                  </span>
                )}
              </>
            )}
          </td>
        );
      } else {
        return (
          <td key={index}>
            {insurance.Insurance[`${attr}`].toLocaleString("en-US")}
            <br />
            {index !== 0 && (
              <>
                {insurance.Insurance[`${attr}`] -
                  props.insurances[0].Insurance[`${attr}`] >=
                0 ? (
                  <span className="insurance-up">
                    (+
                    {(
                      insurance.Insurance[`${attr}`] -
                      props.insurances[0].Insurance[`${attr}`]
                    ).toLocaleString("en-US")}
                    )
                  </span>
                ) : (
                  <span className="insurance-down">
                    (
                    {(
                      insurance.Insurance[`${attr}`] -
                      props.insurances[0].Insurance[`${attr}`]
                    ).toLocaleString("en-US")}
                    )
                  </span>
                )}
              </>
            )}
          </td>
        );
      }
    });
    return div;
  };

  const setBuyData = (insuranceId, covidProtect, premium, yearOfBirth) => {
    props.setBuyData({
      insuranceId: insuranceId,
      covidProtect: covidProtect,
      premium: premium,
      yearOfBirth: yearOfBirth,
    });
    navigate("/buy");
  };

  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    if (data) {
      let year = new Date().getFullYear();
      let ageInput = year - data.year;
      setAge(ageInput);
    }
  }, [data]);

  useEffect(() => {
    if (age) {
      props.getInsurances(age);
    }
  }, [age]);

  useEffect(() => {
    if (props.insurances && data) {
      setInsuranceCount(props.insurances.length + 1);
      const name = props.insurances.map((insurance, index) => {
        return (
          <th
            key={index}
            className="insurance-name"
            style={{
              backgroundColor: "#C3B5FF",
              backgroundImage: `url(${insurance.Insurance.logo})`,
              backgroundPosition: "top right",
              backgroundRepeat: "no-repeat",
              backgroundSize: "60px 40px",
            }}
          >
            {insurance.Insurance.name}
          </th>
        );
      });
      setNameDiv(name);
      const covidPrice = props.insurances.map((insurance, index) => {
        if (!insurance.premium) {
          return <th key={index}>-</th>;
        } else {
          return (
            <th key={index}>
              ฿{insurance.premium.toLocaleString("en-US")}
              <br />
              {index === 0 && <br />}
              {index !== 0 && (
                <>
                  {insurance.premium - props.insurances[0].premium >= 0 ? (
                    <span className="insurance-down">
                      (+
                      {(
                        insurance.premium - props.insurances[0].premium
                      ).toLocaleString("en-US")}
                      )
                    </span>
                  ) : (
                    <span className="insurance-up">
                      (
                      {(
                        insurance.premium - props.insurances[0].premium
                      ).toLocaleString("en-US")}
                      )
                    </span>
                  )}
                </>
              )}
              <button
                type="button"
                className="buy-button"
                onClick={() => {
                  setBuyData(
                    insurance.insuranceId,
                    true,
                    insurance.premium,
                    data.year
                  );
                }}
              >
                Buy
              </button>
            </th>
          );
        }
      });
      setCovidPriceDiv(covidPrice);
      const nonCovidPrice = props.insurances.map((insurance, index) => {
        return (
          <th key={index}>
            ฿{insurance.nonCovidPremium.toLocaleString("en-US")}
            <br />
            {index === 0 && <br />}
            {index !== 0 && (
              <>
                {insurance.nonCovidPremium -
                  props.insurances[0].nonCovidPremium >=
                0 ? (
                  <span className="insurance-down">
                    (+
                    {(
                      insurance.nonCovidPremium -
                      props.insurances[0].nonCovidPremium
                    ).toLocaleString("en-US")}
                    )
                  </span>
                ) : (
                  <span className="insurance-up">
                    (
                    {(
                      insurance.nonCovidPremium -
                      props.insurances[0].nonCovidPremium
                    ).toLocaleString("en-US")}
                    )
                  </span>
                )}
              </>
            )}
            <button
              type="button"
              className="buy-button"
              onClick={() => {
                setBuyData(
                  insurance.insuranceId,
                  false,
                  insurance.nonCovidPremium,
                  data.year
                );
              }}
            >
              Buy
            </button>
          </th>
        );
      });
      setNonCovidPriceDiv(nonCovidPrice);
      setMaxPerYearDiv(getDiv("maxMedExpensePerYear"));
      setMaxPerTimeDiv(getDiv("maxMedExpensePerTime"));
      setNormalRoomDiv(getDiv("normalPatientRoomExpense"));
      setIcuRoomDiv(getDiv("icuCcuPatientRoomExpense"));
      setGenMedExpDiv(getDiv("genMedExpense"));
      setEmerMedExpDiv(getDiv("emergencyMedExpense"));
      setCrfDiv(getDiv("crfExpense"));
      setCancerDiv(getDiv("cancerExpense"));
      setAmbulanceDiv(getDiv("ambulanceExpense"));
      setNormalIncomeDiv(getDiv("normalPatientIncomeCompensateExpense"));
      setIcuIncomeDiv(getDiv("icuCcuPatientIncomeCompensateExpense"));
      setSurgicalDiv(getDiv("surgicalTreatmentExpense"));
      setOpdDiv(getDiv("opdExpense"));
      setDeathDiv(getDiv("deathOrPermanentDisabilityExpense"));
      setHealthCheckDiv(getDiv("healthCheckOrVaccineExpense"));
      setDentistDiv(getDiv("dentistExpense"));
    }
  }, [props.insurances]);

  return (
    <div className="content">
      <h2>Health Insurance</h2>
      <Container>
        <FloatingLabel label="Insured's Year of Birth (A.D.)" className="mb-4">
          <Form.Control
            name="year"
            type="number"
            placeholder="Insured's Year of Birth (A.D.)"
            onChange={handleChange}
            ref={input}
            required
          />
        </FloatingLabel>
        {props.insurances ? (
          <>
            {age >= 15 && age <= 70 ? (
              <div className="insurance-table">
                <Table striped>
                  <thead>
                    <tr>
                      <th></th>
                      {nameDiv}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Included COVID Price (baht/year)</td>
                      {covidPriceDiv}
                    </tr>
                    <tr>
                      <td>Non-COVID Price (baht/year)</td>
                      {nonCovidPriceDiv}
                    </tr>
                    <tr>
                      <th colSpan={insuranceCount}>
                        1. In-patient (IPD) medical expenses per year
                      </th>
                    </tr>
                    <tr>
                      <td>• Maximum expenses per year</td>
                      {maxPerYearDiv}
                    </tr>
                    <tr>
                      <td>• Maximum expenses per disease or per accident</td>
                      {maxPerTimeDiv}
                    </tr>
                    <tr>
                      <td>• Normal patient room expense</td>
                      {normalRoomDiv}
                    </tr>
                    <tr>
                      <td>• ICU/ICC patient room expense</td>
                      {IcuRoomDiv}
                    </tr>
                    <tr>
                      <td>• General medical expense</td>
                      {genMedExpDiv}
                    </tr>
                    <tr>
                      <td>• Emergency medical expense</td>
                      {emerMedExpDiv}
                    </tr>
                    <tr>
                      <td>• Chronic renal failure (CRF) expense</td>
                      {crfDiv}
                    </tr>
                    <tr>
                      <td>• Cancer expense</td>
                      {cancerDiv}
                    </tr>
                    <tr>
                      <td>• Ambulance expense</td>
                      {ambulanceDiv}
                    </tr>
                    <tr>
                      <td>• Normal patient income compensate</td>
                      {normalIncomeDiv}
                    </tr>
                    <tr>
                      <td>• ICU/ICC patient income compensate</td>
                      {icuIncomeDiv}
                    </tr>
                    <tr>
                      <td>• Surgical treatment expense</td>
                      {surgicalDiv}
                    </tr>
                    <tr>
                      <th>2. Out-patient (OPD) medical expense</th>
                      {opdDiv}
                    </tr>
                    <tr>
                      <th>3. Death or permanent disability compensate</th>
                      {deathDiv}
                    </tr>
                    <tr>
                      <th>4. Health checking or vaccine expense</th>
                      {healthCheckDiv}
                    </tr>
                    <tr>
                      <th>5. Dentist expense</th>
                      {dentistDiv}
                    </tr>
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="primary">
                Sorry, we don't have an insurance for you.
              </Alert>
            )}
          </>
        ) : (
          <Alert variant="primary">
            Please enter Insured's Year of Birth (A.D.)
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default InsurancesTable;
