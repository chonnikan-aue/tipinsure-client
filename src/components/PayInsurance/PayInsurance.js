import React from "react";
import "./PayInsurance.css";
import { Modal, Button } from "react-bootstrap";

const PayInsurance = (props) => {
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={props.show}
      onHide={props.handleShow}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <img src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg" 
              alt="tipinsure logo"
              />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="qr-code"
          src="https://thaiartisanfoods.com/wp-content/uploads/2019/02/promptpay-QR.jpg"
          alt="Prompt Pay QR code"
        />
        <Button
          className="submit-button pay-button"
          type="button"
          onClick={props.handlePay}
        >
          Pay
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PayInsurance;
