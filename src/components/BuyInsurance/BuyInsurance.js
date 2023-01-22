import React, { useState, useEffect, useRef } from "react";
import "./BuyInsurance.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";
import PayInsurance from "../PayInsurance/PayInsurance";
import { useNavigate } from "react-router-dom";
import InsuranceDetails from "../InsuranceDetails/InsuranceDetails";

const BuyInsurance = (props) => {
  const navigate = useNavigate();
  const beneficiaryRelationshipName = useRef();
  const beneficiaryTitle = useRef();
  const beneficiaryFirstName = useRef();
  const beneficiaryLastName = useRef();
  const healthQuestion1 = useRef();
  const healthQuestion2 = useRef();
  const healthQuestion3 = useRef();
  const taxpayerNumber = useRef();
  const deliveryAddressHouseNumber = useRef();
  const deliveryAddressVillageNumber = useRef();
  const deliveryAddressSubDistrict = useRef();
  const deliveryAddressDistrict = useRef();
  const deliveryAddressProvince = useRef();
  const deliveryAddressZipCode = useRef();
  const expiredDate = useRef();
  const [insuredOptionDiv, setInsuredOptionDiv] = useState();
  const [insuredData, setInsuredData] = useState();
  const [insuranceDiv, setInsuranceDiv] = useState();
  const [insurance, setInsurance] = useState();
  const [data, setData] = useState({
    userId: null,
    policyNumber: "TIP" + Math.floor(Math.random() * 9999999999),
    startDate: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 < 10 ? "0" : ""
    }${new Date().getMonth() + 1}-${new Date().getDate() + 1 < 10 ? "0" : ""}${
      new Date().getDate() + 1
    }`,
    expiredDate: `${new Date().getFullYear() + 1}-${
      new Date().getMonth() + 1 < 10 ? "0" : ""
    }${new Date().getMonth() + 1}-${
      new Date().getDate() < 10 ? "0" : ""
    }${new Date().getDate()}`,
  });
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleChange = (e) => {
    if (e.target.name === "startDate") {
      let startDateInput = e.target.value.split("-");
      startDateInput[0] = parseInt(startDateInput[0]) + 1;
      if (parseInt(startDateInput[2]) - 1 < 10) {
        startDateInput[2] = "0" + (parseInt(startDateInput[2]) - 1);
      } else {
        startDateInput[2] = parseInt(startDateInput[2]) - 1;
      }
      let expiredDateInput = startDateInput.join("-");
      setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        expiredDate: expiredDateInput,
      }));
      expiredDate.current.value = expiredDateInput;
    } else {
      setData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleInsured = (e) => {
    setInsuredData(props.userData.InsuredInsurances[e.target.value]);
    e.target.disabled = true;
  };

  const handlePay = () => {
    if (
      data.deliveryAddressHouseNumber &&
      data.deliveryAddressVillageNumber &&
      data.deliveryAddressSubDistrict &&
      data.deliveryAddressDistrict &&
      data.deliveryAddressProvince &&
      data.deliveryAddressZipCode
    ) {
      axios
        .post(`${process.env.REACT_APP_API}/insured`, data)
        .then((res) => {
          props.getUserData();
          Swal.fire({
            icon: "success",
            title: "Buy Succeesfully!",
            html: "Thank you for buying. <br /> Policy will be delivered within 7-14 business days.",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/insured`, {
          title: data.title,
          firstName: data.firstName,
          lastName: data.lastName,
          idCardOrPassportNumber: data.idCardOrPassportNumber,
          dateOfBirth: data.dateOfBirth,
          tel: data.tel,
          email: data.email,
          addressHouseNumber: data.addressHouseNumber,
          addressVillageNumber: data.addressVillageNumber,
          addressSubDistrict: data.addressSubDistrict,
          addressDistrict: data.addressDistrict,
          addressProvince: data.addressProvince,
          addressZipCode: data.addressZipCode,
          beneficiaryRelationshipName: data.beneficiaryRelationshipName,
          beneficiaryTitle: data.beneficiaryTitle,
          beneficiaryFirstName: data.beneficiaryFirstName,
          beneficiaryLastName: data.beneficiaryLastName,
          healthQuestion1: data.healthQuestion1,
          healthQuestion2: data.healthQuestion2,
          healthQuestion3: data.healthQuestion3,
          taxpayerNumber: data.taxpayerNumber,
          deliveryAddressHouseNumber: data.addressHouseNumber,
          deliveryAddressVillageNumber: data.addressVillageNumber,
          deliveryAddressSubDistrict: data.addressSubDistrict,
          deliveryAddressDistrict: data.addressDistrict,
          deliveryAddressProvince: data.addressProvince,
          deliveryAddressZipCode: data.addressZipCode,
          insuranceId: data.insuranceId,
          userId: data.userId,
          policyNumber: data.policyNumber,
          premium: data.premium,
          covidProtect: data.covidProtect,
          startDate: data.startDate,
          expiredDate: data.expiredDate,
        })
        .then((res) => {
          props.getUserData();
          Swal.fire({
            icon: "success",
            title: "Buy Succeesfully!",
            html: "Thank you for buying. <br /> Policy will be delivered within 7-14 business days.",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();
  };

  const handleRadioBtn = (e) => {
    if (e.target.id === "deliveryAddress1") {
      deliveryAddressHouseNumber.current.classList.add("d-none");
      deliveryAddressHouseNumber.current.firstElementChild.required = false;
      deliveryAddressHouseNumber.current.firstElementChild.value = "";
      deliveryAddressVillageNumber.current.classList.add("d-none");
      deliveryAddressVillageNumber.current.firstElementChild.required = false;
      deliveryAddressVillageNumber.current.firstElementChild.value = "";
      deliveryAddressSubDistrict.current.classList.add("d-none");
      deliveryAddressSubDistrict.current.firstElementChild.required = false;
      deliveryAddressSubDistrict.current.firstElementChild.value = "";
      deliveryAddressDistrict.current.classList.add("d-none");
      deliveryAddressDistrict.current.firstElementChild.required = false;
      deliveryAddressDistrict.current.firstElementChild.value = "";
      deliveryAddressProvince.current.classList.add("d-none");
      deliveryAddressProvince.current.firstElementChild.required = false;
      deliveryAddressProvince.current.firstElementChild.value = "";
      deliveryAddressZipCode.current.classList.add("d-none");
      deliveryAddressZipCode.current.firstElementChild.required = false;
      deliveryAddressZipCode.current.firstElementChild.value = "";
    } else if (e.target.id === "deliveryAddress2") {
      deliveryAddressHouseNumber.current.classList.remove("d-none");
      deliveryAddressHouseNumber.current.firstElementChild.required = true;
      deliveryAddressVillageNumber.current.classList.remove("d-none");
      deliveryAddressVillageNumber.current.firstElementChild.required = true;
      deliveryAddressSubDistrict.current.classList.remove("d-none");
      deliveryAddressSubDistrict.current.firstElementChild.required = true;
      deliveryAddressDistrict.current.classList.remove("d-none");
      deliveryAddressDistrict.current.firstElementChild.required = true;
      deliveryAddressProvince.current.classList.remove("d-none");
      deliveryAddressProvince.current.firstElementChild.required = true;
      deliveryAddressZipCode.current.classList.remove("d-none");
      deliveryAddressZipCode.current.firstElementChild.required = true;
    } else if (e.target.id === "beneficiary1") {
      setData((prevState) => ({
        ...prevState,
        beneficiaryRelationshipName: "Statutory Heir",
        beneficiaryTitle: null,
        beneficiaryFirstName: null,
        beneficiaryLastName: null,
      }));
      beneficiaryRelationshipName.current.classList.add("d-none");
      beneficiaryRelationshipName.current.firstElementChild.required = false;
      beneficiaryRelationshipName.current.firstElementChild.value = "";
      beneficiaryTitle.current.classList.add("d-none");
      beneficiaryTitle.current.firstElementChild.required = false;
      beneficiaryTitle.current.firstElementChild.value = "";
      beneficiaryFirstName.current.classList.add("d-none");
      beneficiaryFirstName.current.firstElementChild.required = false;
      beneficiaryFirstName.current.firstElementChild.value = "";
      beneficiaryLastName.current.classList.add("d-none");
      beneficiaryLastName.current.firstElementChild.required = false;
      beneficiaryLastName.current.firstElementChild.value = "";
    } else if (e.target.id === "beneficiary2") {
      beneficiaryRelationshipName.current.classList.remove("d-none");
      beneficiaryRelationshipName.current.firstElementChild.required = true;
      beneficiaryTitle.current.classList.remove("d-none");
      beneficiaryTitle.current.firstElementChild.required = true;
      beneficiaryFirstName.current.classList.remove("d-none");
      beneficiaryFirstName.current.firstElementChild.required = true;
      beneficiaryLastName.current.classList.remove("d-none");
      beneficiaryLastName.current.firstElementChild.required = true;
    } else if (e.target.id === "healthQuestion1_1") {
      setData((prevState) => ({
        ...prevState,
        healthQuestion1: "No",
      }));
      healthQuestion1.current.classList.add("d-none");
      healthQuestion1.current.firstElementChild.required = false;
      healthQuestion1.current.firstElementChild.value = "";
    } else if (e.target.id === "healthQuestion1_2") {
      healthQuestion1.current.classList.remove("d-none");
      healthQuestion1.current.firstElementChild.required = true;
    } else if (e.target.id === "healthQuestion2_1") {
      setData((prevState) => ({
        ...prevState,
        healthQuestion2: "No",
      }));
      healthQuestion2.current.classList.add("d-none");
      healthQuestion2.current.firstElementChild.required = false;
      healthQuestion2.current.firstElementChild.value = "";
    } else if (e.target.id === "healthQuestion2_2") {
      healthQuestion2.current.classList.remove("d-none");
      healthQuestion2.current.firstElementChild.required = true;
    } else if (e.target.id === "healthQuestion3_1") {
      setData((prevState) => ({
        ...prevState,
        healthQuestion3: "No",
      }));
      healthQuestion3.current.classList.add("d-none");
      healthQuestion3.current.firstElementChild.required = false;
      healthQuestion3.current.firstElementChild.value = "";
    } else if (e.target.id === "healthQuestion3_2") {
      healthQuestion3.current.classList.remove("d-none");
      healthQuestion3.current.firstElementChild.required = true;
    } else if (e.target.id === "taxpayerNumber1") {
      taxpayerNumber.current.classList.remove("d-none");
      taxpayerNumber.current.firstElementChild.required = true;
    } else if (e.target.id === "taxpayerNumber2") {
      setData((prevState) => ({
        ...prevState,
        taxpayerNumber: null,
      }));
      taxpayerNumber.current.classList.add("d-none");
      taxpayerNumber.current.firstElementChild.required = false;
      taxpayerNumber.current.firstElementChild.value = "";
    }
  };

  useEffect(() => {
    if (props.buyData) {
      setData((prevState) => ({
        ...prevState,
        insuranceId: props.buyData.insuranceId,
        covidProtect: props.buyData.covidProtect,
        premium: props.buyData.premium,
      }));
      axios
        .get(
          `${process.env.REACT_APP_API}/insurance/${props.buyData.insuranceId}`
        )
        .then((res) => {
          setInsurance(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.buyData]);

  useEffect(() => {
    if (insurance) {
      setInsuranceDiv(
        <InsuranceDetails insurance={insurance} buyData={props.buyData} />
      );
    }
  }, [insurance]);

  useEffect(() => {
    if (props.userData) {
      setData((prevState) => ({
        ...prevState,
        userId: props.userData.id,
      }));
      if (props.userData.InsuredInsurances) {
        if (props.userData.InsuredInsurances.length) {
          const insuredOption = props.userData.InsuredInsurances.map(
            (insuredInsurance, index) => {
              return (
                <option key={index} value={index}>
                  {insuredInsurance.Insured.title}{" "}
                  {insuredInsurance.Insured.firstName}{" "}
                  {insuredInsurance.Insured.lastName} (
                  {insuredInsurance.Insurance.name})
                </option>
              );
            }
          );
          setInsuredOptionDiv(insuredOption);
        }
      }
    }
  }, [props.userData]);

  useEffect(() => {
    if (insuredData) {
      setData((prevState) => ({
        ...prevState,
        title: insuredData.Insured.title,
        firstName: insuredData.Insured.firstName,
        lastName: insuredData.Insured.lastName,
        idCardOrPassportNumber: insuredData.Insured.idCardOrPassportNumber,
        dateOfBirth: insuredData.Insured.dateOfBirth,
        tel: insuredData.Insured.tel,
        email: insuredData.Insured.email,
        addressHouseNumber: insuredData.Insured.addressHouseNumber,
        addressVillageNumber: insuredData.Insured.addressVillageNumber,
        addressSubDistrict: insuredData.Insured.addressSubDistrict,
        addressDistrict: insuredData.Insured.addressDistrict,
        addressProvince: insuredData.Insured.addressProvince,
        addressZipCode: insuredData.Insured.addressZipCode,
        beneficiaryRelationshipName:
          insuredData.Insured.beneficiaryRelationshipName,
        beneficiaryTitle: insuredData.Insured.beneficiaryTitle,
        beneficiaryFirstName: insuredData.Insured.beneficiaryFirstName,
        beneficiaryLastName: insuredData.Insured.beneficiaryLastName,
        healthQuestion1: insuredData.Insured.healthQuestion1,
        healthQuestion2: insuredData.Insured.healthQuestion2,
        healthQuestion3: insuredData.Insured.healthQuestion3,
        taxpayerNumber: insuredData.Insured.taxpayerNumber,
        deliveryAddressHouseNumber:
          insuredData.Insured.deliveryAddressHouseNumber,
        deliveryAddressVillageNumber:
          insuredData.Insured.deliveryAddressVillageNumber,
        deliveryAddressSubDistrict:
          insuredData.Insured.deliveryAddressSubDistrict,
        deliveryAddressDistrict: insuredData.Insured.deliveryAddressDistrict,
        deliveryAddressProvince: insuredData.Insured.deliveryAddressProvince,
        deliveryAddressZipCode: insuredData.Insured.deliveryAddressZipCode,
      }));
    }
  }, [insuredData]);

  return (
    <div className="content">
      {props.buyData && (
        <>
          <h2>Buy Insurance</h2>
          <Form onSubmit={handleSubmit}>
            {props.userData && (
              <Container className="buy-container">
                <p className="info-header">▾ Auto Fill Insured's Data</p>
                <FloatingLabel label="Insured's Data" className="mb-3">
                  <Form.Select
                    name="insured"
                    type="text"
                    placeholder="Insured's Data"
                    onChange={handleInsured}
                  >
                    <option value="">Select Insured's data</option>
                    {insuredOptionDiv}
                  </Form.Select>
                </FloatingLabel>
              </Container>
            )}
            {insuredData ? (
              <>
                <Container className="buy-container">
                  <p className="info-header">▾ 1. Personal Information</p>
                  <FloatingLabel label="Title" className="mb-3">
                    <Form.Select
                      name="title"
                      type="text"
                      placeholder="Title"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select title</option>
                      {insuredData.Insured.title === "Mr." ? (
                        <option value="Mr." selected>
                          Mr.
                        </option>
                      ) : (
                        <option value="Mr.">Mr.</option>
                      )}
                      {insuredData.Insured.title === "Mrs." ? (
                        <option value="Mrs." selected>
                          Mrs.
                        </option>
                      ) : (
                        <option value="Mrs.">Mrs.</option>
                      )}
                      {insuredData.Insured.title === "Miss" ? (
                        <option value="Miss" selected>
                          Miss
                        </option>
                      ) : (
                        <option value="Miss">Miss</option>
                      )}
                      {insuredData.Insured.title === "K." ? (
                        <option value="K." selected>
                          K. (Khun)
                        </option>
                      ) : (
                        <option value="K.">K. (Khun)</option>
                      )}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.firstName}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.lastName}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="ID Card or Passport Number"
                    className="mb-3"
                  >
                    <Form.Control
                      name="idCardOrPassportNumber"
                      type="text"
                      placeholder="ID Card or Passport Number"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.idCardOrPassportNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Date of Birth" className="mb-3">
                    <Form.Control
                      name="dateOfBirth"
                      type="date"
                      min={`${props.buyData.yearOfBirth}-01-01`}
                      max={`${props.buyData.yearOfBirth}-12-31`}
                      placeholder="Date of Birth"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.dateOfBirth}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Telephone Number (0XX-XXX-XXXX)"
                    className="mb-3"
                  >
                    <Form.Control
                      name="tel"
                      type="tel"
                      pattern="[0]{1}[1-9]{2}-[0-9]{3}-[0-9]{4}"
                      placeholder="Telephone Number"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.tel}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.email}
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 2. Address</p>
                  <FloatingLabel label="House Number" className="mb-3">
                    <Form.Control
                      name="addressHouseNumber"
                      type="text"
                      placeholder="House Number"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressHouseNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Village Number" className="mb-3">
                    <Form.Control
                      name="addressVillageNumber"
                      type="text"
                      placeholder="Village Number"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressVillageNumber}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Sub District" className="mb-3">
                    <Form.Control
                      name="addressSubDistrict"
                      type="text"
                      placeholder="Sub District"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressSubDistrict}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="District" className="mb-3">
                    <Form.Control
                      name="addressDistrict"
                      type="text"
                      placeholder="District"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressDistrict}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Province" className="mb-3">
                    <Form.Control
                      name="addressProvince"
                      type="text"
                      placeholder="Province"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressProvince}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Zip Code" className="mb-3">
                    <Form.Control
                      name="addressZipCode"
                      type="text"
                      placeholder="Zip Code"
                      onChange={handleChange}
                      required
                      defaultValue={insuredData.Insured.addressZipCode}
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">
                    ▾ 3. Receipt / Policy Delivery Address
                  </p>
                  {insuredData.Insured.addressHouseNumber ===
                    insuredData.Insured.deliveryAddressHouseNumber &&
                  insuredData.Insured.addressVillageNumber ===
                    insuredData.Insured.deliveryAddressVillageNumber &&
                  insuredData.Insured.addressSubDistrict ===
                    insuredData.Insured.deliveryAddressSubDistrict &&
                  insuredData.Insured.addressDistrict ===
                    insuredData.Insured.deliveryAddressDistrict &&
                  insuredData.Insured.addressProvince ===
                    insuredData.Insured.deliveryAddressProvince &&
                  insuredData.Insured.addressZipCode ===
                    insuredData.Insured.deliveryAddressZipCode ? (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="deliveryAddress"
                        id="deliveryAddress1"
                        label="As above address"
                        type="radio"
                        onChange={handleRadioBtn}
                        defaultChecked
                        required
                      />
                      <Form.Check
                        inline
                        className="mb-3"
                        name="deliveryAddress"
                        id="deliveryAddress2"
                        label="Other address"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                      <FloatingLabel
                        label="House Number"
                        className="mb-3 d-none"
                        ref={deliveryAddressHouseNumber}
                      >
                        <Form.Control
                          name="deliveryAddressHouseNumber"
                          type="text"
                          placeholder="House Number"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Village Number"
                        className="mb-3 d-none"
                        ref={deliveryAddressVillageNumber}
                      >
                        <Form.Control
                          name="deliveryAddressVillageNumber"
                          type="text"
                          placeholder="Village Number"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Sub District"
                        className="mb-3 d-none"
                        ref={deliveryAddressSubDistrict}
                      >
                        <Form.Control
                          name="deliveryAddressSubDistrict"
                          type="text"
                          placeholder="Sub District"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="District"
                        className="mb-3 d-none"
                        ref={deliveryAddressDistrict}
                      >
                        <Form.Control
                          name="deliveryAddressDistrict"
                          type="text"
                          placeholder="District"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Province"
                        className="mb-3 d-none"
                        ref={deliveryAddressProvince}
                      >
                        <Form.Control
                          name="deliveryAddressProvince"
                          type="text"
                          placeholder="Province"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Zip Code"
                        className="mb-3 d-none"
                        ref={deliveryAddressZipCode}
                      >
                        <Form.Control
                          name="deliveryAddressZipCode"
                          type="text"
                          placeholder="Zip Code"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </>
                  ) : (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="deliveryAddress"
                        id="deliveryAddress1"
                        label="As above address"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                      <Form.Check
                        inline
                        className="mb-3"
                        name="deliveryAddress"
                        id="deliveryAddress2"
                        label="Other address"
                        type="radio"
                        onChange={handleRadioBtn}
                        defaultChecked
                        required
                      />
                      <FloatingLabel
                        label="House Number"
                        className="mb-3"
                        ref={deliveryAddressHouseNumber}
                      >
                        <Form.Control
                          name="deliveryAddressHouseNumber"
                          type="text"
                          placeholder="House Number"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressHouseNumber
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Village Number"
                        className="mb-3"
                        ref={deliveryAddressVillageNumber}
                      >
                        <Form.Control
                          name="deliveryAddressVillageNumber"
                          type="text"
                          placeholder="Village Number"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressVillageNumber
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Sub District"
                        className="mb-3"
                        ref={deliveryAddressSubDistrict}
                      >
                        <Form.Control
                          name="deliveryAddressSubDistrict"
                          type="text"
                          placeholder="Sub District"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressSubDistrict
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="District"
                        className="mb-3"
                        ref={deliveryAddressDistrict}
                      >
                        <Form.Control
                          name="deliveryAddressDistrict"
                          type="text"
                          placeholder="District"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressDistrict
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Province"
                        className="mb-3"
                        ref={deliveryAddressProvince}
                      >
                        <Form.Control
                          name="deliveryAddressProvince"
                          type="text"
                          placeholder="Province"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressProvince
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Zip Code"
                        className="mb-3"
                        ref={deliveryAddressZipCode}
                      >
                        <Form.Control
                          name="deliveryAddressZipCode"
                          type="text"
                          placeholder="Zip Code"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.deliveryAddressZipCode
                          }
                        />
                      </FloatingLabel>
                    </>
                  )}
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 4. Beneficiary</p>
                  {!(
                    insuredData.Insured.beneficiaryTitle &&
                    insuredData.Insured.beneficiaryFirstName &&
                    insuredData.Insured.beneficiaryLastName
                  ) ? (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="beneficiary"
                        id="beneficiary1"
                        label="Statutory Heir"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                        defaultChecked
                      />
                      <Form.Check
                        inline
                        className="mb-3"
                        name="beneficiary"
                        id="beneficiary2"
                        label="Others (please specify)"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                      <FloatingLabel
                        label="Relationship Name"
                        className="mb-3 d-none"
                        ref={beneficiaryRelationshipName}
                      >
                        <Form.Select
                          name="beneficiaryRelationshipName"
                          type="text"
                          placeholder="Relationship Name"
                          onChange={handleChange}
                        >
                          <option value="">Select relationship name</option>
                          <option value="Wife">Wife</option>
                          <option value="Husband">Husband</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Older brother/sister">
                            Older brother/sister
                          </option>
                          <option value="Younger brother/sister">
                            Younger brother/sister
                          </option>
                          <option value="Daughter">Daughter</option>
                          <option value="Son">Son</option>
                          <option value="Partner">Partner</option>
                          <option value="Others">Others</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary Title"
                        className="mb-3 d-none"
                        ref={beneficiaryTitle}
                      >
                        <Form.Select
                          name="beneficiaryTitle"
                          type="text"
                          placeholder="Beneficiary Title"
                          onChange={handleChange}
                        >
                          <option value="">Select beneficiary title</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Miss">Miss</option>
                          <option value="K.">K. (Khun)</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary First Name"
                        className="mb-3 d-none"
                        ref={beneficiaryFirstName}
                      >
                        <Form.Control
                          name="beneficiaryFirstName"
                          type="text"
                          placeholder="Beneficiary First Name"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary Last Name"
                        className="mb-3 d-none"
                        ref={beneficiaryLastName}
                      >
                        <Form.Control
                          name="beneficiaryLastName"
                          type="text"
                          placeholder="Beneficiary Last Name"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </>
                  ) : (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="beneficiary"
                        id="beneficiary1"
                        label="Statutory Heir"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                      <Form.Check
                        inline
                        className="mb-3"
                        name="beneficiary"
                        id="beneficiary2"
                        label="Others (please specify)"
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                        defaultChecked
                      />
                      <FloatingLabel
                        label="Relationship Name"
                        className="mb-3"
                        ref={beneficiaryRelationshipName}
                      >
                        <Form.Select
                          name="beneficiaryRelationshipName"
                          type="text"
                          placeholder="Relationship Name"
                          onChange={handleChange}
                          defaultValue={
                            insuredData.Insured.beneficiaryRelationshipName
                          }
                          required
                        >
                          <option value="">Select relationship name</option>
                          <option value="Wife">Wife</option>
                          <option value="Husband">Husband</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Older brother/sister">
                            Older brother/sister
                          </option>
                          <option value="Younger brother/sister">
                            Younger brother/sister
                          </option>
                          <option value="Daughter">Daughter</option>
                          <option value="Son">Son</option>
                          <option value="Partner">Partner</option>
                          <option value="Others">Others</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary Title"
                        className="mb-3"
                        ref={beneficiaryTitle}
                      >
                        <Form.Select
                          name="beneficiaryTitle"
                          type="text"
                          placeholder="Beneficiary Title"
                          onChange={handleChange}
                          defaultValue={insuredData.Insured.beneficiaryTitle}
                          required
                        >
                          <option value="">Select beneficiary title</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Miss">Miss</option>
                          <option value="K.">K. (Khun)</option>
                        </Form.Select>
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary First Name"
                        className="mb-3"
                        ref={beneficiaryFirstName}
                      >
                        <Form.Control
                          name="beneficiaryFirstName"
                          type="text"
                          placeholder="Beneficiary First Name"
                          onChange={handleChange}
                          required
                          defaultValue={
                            insuredData.Insured.beneficiaryFirstName
                          }
                        />
                      </FloatingLabel>
                      <FloatingLabel
                        label="Beneficiary Last Name"
                        className="mb-3"
                        ref={beneficiaryLastName}
                      >
                        <Form.Control
                          name="beneficiaryLastName"
                          type="text"
                          placeholder="Beneficiary Last Name"
                          onChange={handleChange}
                          required
                          defaultValue={insuredData.Insured.beneficiaryLastName}
                        />
                      </FloatingLabel>
                    </>
                  )}
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 5. Health-check Question</p>
                  <ol>
                    <li className="mb-3">
                      Have you ever been denied a request for life insurance,
                      health insurance, critical illness insurance, or personal
                      accident insurance, being denied the renewal of the
                      insurance contract, being charged an additional premium,
                      or being changed the conditions for such insurance? (If
                      yes, please provide insurance company's name and sum
                      insured)
                    </li>
                    {insuredData.Insured.healthQuestion1 === "No" ? (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion1"
                          id="healthQuestion1_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          defaultChecked
                          required
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion1"
                          id="healthQuestion1_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3 d-none"
                          ref={healthQuestion1}
                        >
                          <Form.Control
                            name="healthQuestion1"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </>
                    ) : (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion1"
                          id="healthQuestion1_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion1"
                          id="healthQuestion1_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          defaultChecked
                          required
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3"
                          ref={healthQuestion1}
                        >
                          <Form.Control
                            name="healthQuestion1"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                            required
                            defaultValue={insuredData.Insured.healthQuestion1}
                          />
                        </FloatingLabel>
                      </>
                    )}
                    <li className="mb-3">
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
                      serious illnesses?
                    </li>
                    {insuredData.Insured.healthQuestion2 === "No" ? (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion2"
                          id="healthQuestion2_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                          defaultChecked
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion2"
                          id="healthQuestion2_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3 d-none"
                          ref={healthQuestion2}
                        >
                          <Form.Control
                            name="healthQuestion2"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </>
                    ) : (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion2"
                          id="healthQuestion2_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion2"
                          id="healthQuestion2_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                          defaultChecked
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3"
                          ref={healthQuestion2}
                        >
                          <Form.Control
                            name="healthQuestion2"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                            required
                            defaultValue={insuredData.Insured.healthQuestion2}
                          />
                        </FloatingLabel>
                      </>
                    )}
                    <li className="mb-3">
                      Within the past 5 years to the present, have you ever seen
                      a doctor for consultation, advice, or diagnosis as well as
                      receiving any treatment, prescription, or therapy due to
                      injury, illness, or surgery? (If yes, please provide
                      details of your doctor's diagnosis, signs, symptoms
                      treatment, or advice received and the date)
                    </li>
                    {insuredData.Insured.healthQuestion3 === "No" ? (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion3"
                          id="healthQuestion3_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                          defaultChecked
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion3"
                          id="healthQuestion3_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3 d-none"
                          ref={healthQuestion3}
                        >
                          <Form.Control
                            name="healthQuestion3"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </>
                    ) : (
                      <>
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion3"
                          id="healthQuestion3_1"
                          label="No"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                          defaultChecked
                        />
                        <Form.Check
                          inline
                          className="mb-3"
                          name="healthQuestion3"
                          id="healthQuestion3_2"
                          label="Yes (please specify)"
                          type="radio"
                          onChange={handleRadioBtn}
                          required
                          defaultChecked
                        />
                        <FloatingLabel
                          label="Please specify"
                          className="mb-3"
                          ref={healthQuestion3}
                        >
                          <Form.Control
                            name="healthQuestion3"
                            type="text"
                            placeholder="Please specify"
                            onChange={handleChange}
                            required
                            defaultValue={insuredData.Insured.healthQuestion3}
                          />
                        </FloatingLabel>
                      </>
                    )}
                  </ol>
                  <p className="buy-warning">
                    <strong>
                      <u>Warning of the Office of Insurance Commission (OIC)</u>
                    </strong>
                    <br />
                    Answer all of the above questions truthfully. If the insured
                    conceals the truth or making a false statement, this will
                    result in this contract becoming void. The company has the
                    right to void the insurance contract, according to the Civil
                    and Commercial Code, Section 865
                  </p>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 6. Income Tax Exemption</p>
                  <p className="mb-3">
                    Will the insured use the right of income tax exemption under
                    the law on taxation?
                  </p>
                  {insuredData.Insured.taxpayerNumber ? (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="taxpayerNumber"
                        id="taxpayerNumber1"
                        label="Yes, the insured have the intention and consent to the non-life insurance company to submit and disclose insurance premium information to the Revenue Department in accordance with the rules and procedures specified by the Revenue Department. If the insured is a Non-Thai Residence, who is liable to pay tax to the law on taxation. Please enter your taxpayer number."
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                        defaultChecked
                      />
                      <FloatingLabel
                        label="Taxpayer Number"
                        className="mb-3"
                        ref={taxpayerNumber}
                      >
                        <Form.Control
                          name="taxpayerNumber"
                          type="text"
                          placeholder="Taxpayer Number"
                          onChange={handleChange}
                          required
                          defaultValue={insuredData.Insured.taxpayerNumber}
                        />
                      </FloatingLabel>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="taxpayerNumber"
                        id="taxpayerNumber2"
                        label="No, The consent to the non-life insurance company to send and disclose the above information will be effective until the insured notifies the company to cancel or change."
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                    </>
                  ) : (
                    <>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="taxpayerNumber"
                        id="taxpayerNumber1"
                        label="Yes, the insured have the intention and consent to the non-life insurance company to submit and disclose insurance premium information to the Revenue Department in accordance with the rules and procedures specified by the Revenue Department. If the insured is a Non-Thai Residence, who is liable to pay tax to the law on taxation. Please enter your taxpayer number."
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                      />
                      <FloatingLabel
                        label="Taxpayer Number"
                        className="mb-3 d-none"
                        ref={taxpayerNumber}
                      >
                        <Form.Control
                          name="taxpayerNumber"
                          type="text"
                          placeholder="Taxpayer Number"
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                      <Form.Check
                        inline
                        className="mb-3"
                        name="taxpayerNumber"
                        id="taxpayerNumber2"
                        label="No, The consent to the non-life insurance company to send and disclose the above information will be effective until the insured notifies the company to cancel or change."
                        type="radio"
                        onChange={handleRadioBtn}
                        required
                        defaultChecked
                      />
                    </>
                  )}
                </Container>
              </>
            ) : (
              <>
                <Container className="buy-container">
                  <p className="info-header">▾ 1. Personal Information</p>
                  <FloatingLabel label="Title" className="mb-3">
                    <Form.Select
                      name="title"
                      type="text"
                      placeholder="Title"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="K.">K. (Khun)</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="ID Card or Passport Number"
                    className="mb-3"
                  >
                    <Form.Control
                      name="idCardOrPassportNumber"
                      type="text"
                      placeholder="ID Card or Passport Number"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Date of Birth" className="mb-3">
                    <Form.Control
                      name="dateOfBirth"
                      type="date"
                      min={`${props.buyData.yearOfBirth}-01-01`}
                      max={`${props.buyData.yearOfBirth}-12-31`}
                      placeholder="Date of Birth"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Telephone Number (0XX-XXX-XXXX)"
                    className="mb-3"
                  >
                    <Form.Control
                      name="tel"
                      type="tel"
                      pattern="[0]{1}[1-9]{2}-[0-9]{3}-[0-9]{4}"
                      placeholder="Telephone Number"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 2. Address</p>
                  <FloatingLabel label="House Number" className="mb-3">
                    <Form.Control
                      name="addressHouseNumber"
                      type="text"
                      placeholder="House Number"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Village Number" className="mb-3">
                    <Form.Control
                      name="addressVillageNumber"
                      type="text"
                      placeholder="Village Number"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Sub District" className="mb-3">
                    <Form.Control
                      name="addressSubDistrict"
                      type="text"
                      placeholder="Sub District"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="District" className="mb-3">
                    <Form.Control
                      name="addressDistrict"
                      type="text"
                      placeholder="District"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Province" className="mb-3">
                    <Form.Control
                      name="addressProvince"
                      type="text"
                      placeholder="Province"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Zip Code" className="mb-3">
                    <Form.Control
                      name="addressZipCode"
                      type="text"
                      placeholder="Zip Code"
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">
                    ▾ 3. Receipt / Policy Delivery Address
                  </p>
                  <Form.Check
                    inline
                    className="mb-3"
                    name="deliveryAddress"
                    id="deliveryAddress1"
                    label="As above address"
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                  <Form.Check
                    inline
                    className="mb-3"
                    name="deliveryAddress"
                    id="deliveryAddress2"
                    label="Other address"
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                  <FloatingLabel
                    label="House Number"
                    className="mb-3 d-none"
                    ref={deliveryAddressHouseNumber}
                  >
                    <Form.Control
                      name="deliveryAddressHouseNumber"
                      type="text"
                      placeholder="House Number"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Village Number"
                    className="mb-3 d-none"
                    ref={deliveryAddressVillageNumber}
                  >
                    <Form.Control
                      name="deliveryAddressVillageNumber"
                      type="text"
                      placeholder="Village Number"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Sub District"
                    className="mb-3 d-none"
                    ref={deliveryAddressSubDistrict}
                  >
                    <Form.Control
                      name="deliveryAddressSubDistrict"
                      type="text"
                      placeholder="Sub District"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="District"
                    className="mb-3 d-none"
                    ref={deliveryAddressDistrict}
                  >
                    <Form.Control
                      name="deliveryAddressDistrict"
                      type="text"
                      placeholder="District"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Province"
                    className="mb-3 d-none"
                    ref={deliveryAddressProvince}
                  >
                    <Form.Control
                      name="deliveryAddressProvince"
                      type="text"
                      placeholder="Province"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Zip Code"
                    className="mb-3 d-none"
                    ref={deliveryAddressZipCode}
                  >
                    <Form.Control
                      name="deliveryAddressZipCode"
                      type="text"
                      placeholder="Zip Code"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 4. Beneficiary</p>
                  <Form.Check
                    inline
                    className="mb-3"
                    name="beneficiary"
                    id="beneficiary1"
                    label="Statutory Heir"
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                  <Form.Check
                    inline
                    className="mb-3"
                    name="beneficiary"
                    id="beneficiary2"
                    label="Others (please specify)"
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                  <FloatingLabel
                    label="Relationship Name"
                    className="mb-3 d-none"
                    ref={beneficiaryRelationshipName}
                  >
                    <Form.Select
                      name="beneficiaryRelationshipName"
                      type="text"
                      placeholder="Relationship Name"
                      onChange={handleChange}
                    >
                      <option value="">Select relationship name</option>
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Older brother/sister">
                        Older brother/sister
                      </option>
                      <option value="Younger brother/sister">
                        Younger brother/sister
                      </option>
                      <option value="Daughter">Daughter</option>
                      <option value="Son">Son</option>
                      <option value="Partner">Partner</option>
                      <option value="Others">Others</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    label="Beneficiary Title"
                    className="mb-3 d-none"
                    ref={beneficiaryTitle}
                  >
                    <Form.Select
                      name="beneficiaryTitle"
                      type="text"
                      placeholder="Beneficiary Title"
                      onChange={handleChange}
                    >
                      <option value="">Select beneficiary title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="K.">K. (Khun)</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    label="Beneficiary First Name"
                    className="mb-3 d-none"
                    ref={beneficiaryFirstName}
                  >
                    <Form.Control
                      name="beneficiaryFirstName"
                      type="text"
                      placeholder="Beneficiary First Name"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    label="Beneficiary Last Name"
                    className="mb-3 d-none"
                    ref={beneficiaryLastName}
                  >
                    <Form.Control
                      name="beneficiaryLastName"
                      type="text"
                      placeholder="Beneficiary Last Name"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 5. Health-check Question</p>
                  <ol>
                    <li className="mb-3">
                      Have you ever been denied a request for life insurance,
                      health insurance, critical illness insurance, or personal
                      accident insurance, being denied the renewal of the
                      insurance contract, being charged an additional premium,
                      or being changed the conditions for such insurance? (If
                      yes, please provide insurance company's name and sum
                      insured)
                    </li>
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion1"
                      id="healthQuestion1_1"
                      label="No"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion1"
                      id="healthQuestion1_2"
                      label="Yes (please specify)"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <FloatingLabel
                      label="Please specify"
                      className="mb-3 d-none"
                      ref={healthQuestion1}
                    >
                      <Form.Control
                        name="healthQuestion1"
                        type="text"
                        placeholder="Please specify"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    <li className="mb-3">
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
                      serious illnesses?
                    </li>
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion2"
                      id="healthQuestion2_1"
                      label="No"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion2"
                      id="healthQuestion2_2"
                      label="Yes (please specify)"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <FloatingLabel
                      label="Please specify"
                      className="mb-3 d-none"
                      ref={healthQuestion2}
                    >
                      <Form.Control
                        name="healthQuestion2"
                        type="text"
                        placeholder="Please specify"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                    <li className="mb-3">
                      Within the past 5 years to the present, have you ever seen
                      a doctor for consultation, advice, or diagnosis as well as
                      receiving any treatment, prescription, or therapy due to
                      injury, illness, or surgery? (If yes, please provide
                      details of your doctor's diagnosis, signs, symptoms
                      treatment, or advice received and the date)
                    </li>
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion3"
                      id="healthQuestion3_1"
                      label="No"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <Form.Check
                      inline
                      className="mb-3"
                      name="healthQuestion3"
                      id="healthQuestion3_2"
                      label="Yes (please specify)"
                      type="radio"
                      onChange={handleRadioBtn}
                      required
                    />
                    <FloatingLabel
                      label="Please specify"
                      className="mb-3 d-none"
                      ref={healthQuestion3}
                    >
                      <Form.Control
                        name="healthQuestion3"
                        type="text"
                        placeholder="Please specify"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </ol>
                  <p className="buy-warning">
                    <strong>
                      <u>Warning of the Office of Insurance Commission (OIC)</u>
                    </strong>
                    <br />
                    Answer all of the above questions truthfully. If the insured
                    conceals the truth or making a false statement, this will
                    result in this contract becoming void. The company has the
                    right to void the insurance contract, according to the Civil
                    and Commercial Code, Section 865
                  </p>
                </Container>
                <Container className="buy-container">
                  <p className="info-header">▾ 6. Income Tax Exemption</p>
                  <p className="mb-3">
                    Will the insured use the right of income tax exemption under
                    the law on taxation?
                  </p>
                  <Form.Check
                    inline
                    className="mb-3"
                    name="taxpayerNumber"
                    id="taxpayerNumber1"
                    label="Yes, the insured have the intention and consent to the non-life insurance company to submit and disclose insurance premium information to the Revenue Department in accordance with the rules and procedures specified by the Revenue Department. If the insured is a Non-Thai Residence, who is liable to pay tax to the law on taxation. Please enter your taxpayer number."
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                  <FloatingLabel
                    label="Taxpayer Number"
                    className="mb-3 d-none"
                    ref={taxpayerNumber}
                  >
                    <Form.Control
                      name="taxpayerNumber"
                      type="text"
                      placeholder="Taxpayer Number"
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <Form.Check
                    inline
                    className="mb-3"
                    name="taxpayerNumber"
                    id="taxpayerNumber2"
                    label="No, The consent to the non-life insurance company to send and disclose the above information will be effective until the insured notifies the company to cancel or change."
                    type="radio"
                    onChange={handleRadioBtn}
                    required
                  />
                </Container>
              </>
            )}
            <Container className="buy-container">
              <p className="info-header">▾ 7. Insurance Detail</p>
              <FloatingLabel label="Effective Date" className="mb-3">
                <Form.Control
                  name="startDate"
                  type="date"
                  min={`${new Date().getFullYear()}-${
                    new Date().getMonth() + 1 < 10 ? "0" : ""
                  }${new Date().getMonth() + 1}-${
                    new Date().getDate() < 10 ? "0" : ""
                  }${new Date().getDate()}`}
                  placeholder="Effective Date"
                  onChange={handleChange}
                  defaultValue={data.startDate}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Expired Date" className="mb-3">
                <Form.Control
                  name="expiredDate"
                  type="date"
                  placeholder="Expired Date"
                  onChange={handleChange}
                  defaultValue={data.expiredDate}
                  ref={expiredDate}
                  disabled
                />
              </FloatingLabel>
              {insuranceDiv}
            </Container>
            <Button className="submit-button" type="submit">
              Submit and Pay
            </Button>
          </Form>
          <PayInsurance
            show={show}
            handleShow={handleShow}
            handlePay={handlePay}
          />
        </>
      )}
    </div>
  );
};

export default BuyInsurance;
