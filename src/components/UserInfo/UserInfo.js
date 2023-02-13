import React, { useState, useEffect } from "react";
import "./UserInfo.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import InsuranceDetails from "../InsuranceDetails/InsuranceDetails";

const UserInfo = (props) => {
  const [data, setData] = useState({
    username: props.userData.username,
    referalCode: props.userData.referalCode,
  });
  const [insuranceDiv, setInsuranceDiv] = useState();

  const handleChange = (e) => {
    if (e.target.name === "referalCode" && e.target.value === "") {
      setData((prevState) => ({
        ...prevState,
        referalCode: null,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .put(`${process.env.REACT_APP_API}/user/${props.userData.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.name === "SequelizeUniqueConstraintError") {
          Swal.fire({
            icon: "error",
            title: "Please try another",
            text: "This username is already taken.",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Edit Successfully!",
            html: "Your information was updated.",
          });
          props.setLoginData(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.userData.InsuredInsurances) {
      if (props.userData.InsuredInsurances.length) {
        const purchasedInsurance = props.userData.InsuredInsurances.map(
          (insurance, index) => {
            return (
              <li key={index}>
                <ul>
                  <li>Insured:</li>
                  <ul>
                    <li>
                      Name:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.title} {insurance.Insured.firstName}{" "}
                        {insurance.Insured.lastName}
                      </span>{" "}
                    </li>
                    <li>
                      ID Card / Passport Number:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.idCardOrPassportNumber}
                      </span>{" "}
                    </li>
                    <li>
                      Date of Birth:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.dateOfBirth}
                      </span>{" "}
                    </li>
                    <li>
                      Tel:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.tel}
                      </span>{" "}
                    </li>
                    <li>
                      Email:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.email}
                      </span>{" "}
                    </li>
                    <li>
                      Address:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.addressHouseNumber}, Village number{" "}
                        {insurance.Insured.addressVillageNumber},{" "}
                        {insurance.Insured.addressSubDistrict},{" "}
                        {insurance.Insured.addressDistrict},{" "}
                        {insurance.Insured.addressProvince}{" "}
                        {insurance.Insured.addressZipCode}
                      </span>{" "}
                    </li>
                    <li>
                      Delivery Address:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.deliveryAddressHouseNumber}, Village
                        number {insurance.Insured.deliveryAddressVillageNumber},{" "}
                        {insurance.Insured.deliveryAddressSubDistrict},{" "}
                        {insurance.Insured.deliveryAddressDistrict},{" "}
                        {insurance.Insured.deliveryAddressProvince}{" "}
                        {insurance.Insured.deliveryAddressZipCode}
                      </span>{" "}
                    </li>
                    <li>
                      Beneficiary:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.beneficiaryRelationshipName}
                      </span>{" "}
                    </li>
                    {insurance.Insured.beneficiaryTitle && (
                      <li>
                        Beneficiary Name:{" "}
                        <span className="insurance-detail">
                          {insurance.Insured.beneficiaryTitle}{" "}
                          {insurance.Insured.beneficiaryFirstName}{" "}
                          {insurance.Insured.beneficiaryLastName}
                        </span>{" "}
                      </li>
                    )}
                    <li>
                      Have you ever been denied a request for life insurance,
                      health insurance, critical illness insurance, or personal
                      accident insurance, being denied the renewal of the
                      insurance contract, being charged an additional premium,
                      or being changed the conditions for such insurance?:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.healthQuestion1}
                      </span>{" "}
                    </li>
                    <li>
                      Within the past 5 years to the present, have you ever been
                      infected, have symptoms, or have been treated or under
                      treatment as well as being told by a doctor with the
                      following diseases? cancer, tumors, cysts, cerebrovascular
                      disease (Stroke), heart disease and coronary artery
                      disease. Chronic kidney disease or renal failure, SLE
                      disease (SLE), hypertension (used to treat inpatient
                      cases), diabetes (used to inject insulin), high blood fat
                      (used to take lipid-lowering drugs), Obesity (BMI over
                      33), Chronic obstructive pulmonary disease, Emphysema AIDS
                      or HIV positive blood, Thalassemia, Multiple Sclerosis,
                      Crohn's disease, Hepatitis B or C, Cirrhosis, alcoholism,
                      paralysis, mental disability, used to use drugs, or other
                      serious illnesses?:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.healthQuestion2}
                      </span>{" "}
                    </li>
                    <li>
                      Within the past 5 years to the present, have you ever seen
                      a doctor for consultation, advice, or diagnosis as well as
                      receiving any treatment, prescription, or therapy due to
                      injury, illness, or surgery?:{" "}
                      <span className="insurance-detail">
                        {insurance.Insured.healthQuestion3}
                      </span>{" "}
                    </li>
                    {insurance.Insured.taxpayerNumber ? (
                      <>
                        <li>
                          Will the insured use the right of income tax exemption
                          under the law on taxation?:{" "}
                          <span className="insurance-detail">Yes</span>{" "}
                        </li>
                        <li>
                          Taxpayer Number:{" "}
                          <span className="insurance-detail">
                            {insurance.Insured.taxpayerNumber}
                          </span>{" "}
                        </li>
                      </>
                    ) : (
                      <li>
                        Will the insured use the right of income tax exemption
                        under the law on taxation?:{" "}
                        <span className="insurance-detail">No</span>{" "}
                      </li>
                    )}
                  </ul>
                </ul>
                <InsuranceDetails
                  insurance={insurance.Insurance}
                  insuredInsurances={insurance}
                />
                <hr />
              </li>
            );
          }
        );
        setInsuranceDiv(<ol>{purchasedInsurance}</ol>);
      } else {
        setInsuranceDiv(
          <Alert variant="primary">
            You don't have any purchased insurance.
          </Alert>
        );
      }
    }
  }, [props.userData]);

  return (
    <div className="content">
      {props.userData && (
        <>
          <h2>User's Information</h2>
          <Container className="buy-container">
            <p className="info-header">▾ 1. Edit User's Information</p>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="Username" className="mb-3">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  defaultValue={props.userData.username}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Password" className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </FloatingLabel>
              {props.userData.referalCode ? (
                <FloatingLabel label="Referal Code (if any)" className="mb-3">
                  <Form.Control
                    name="referalCode"
                    type="text"
                    placeholder="Referal Code (if any)"
                    defaultValue={props.userData.referalCode}
                    disabled
                  />
                </FloatingLabel>
              ) : (
                <FloatingLabel label="Referal Code (if any)" className="mb-3">
                  <Form.Control
                    name="referalCode"
                    type="text"
                    placeholder="Referal Code (if any)"
                    onChange={handleChange}
                  />
                </FloatingLabel>
              )}
              <Button className="submit-button" type="submit">
                Save Changes
              </Button>
            </Form>
          </Container>
          <Container className="buy-container">
            <p className="info-header">▾ 2. Purchased Insurances</p>
            {insuranceDiv}
          </Container>
        </>
      )}
    </div>
  );
};

export default UserInfo;
