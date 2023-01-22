import React from "react";
import "./TipTrick.css";
import { Container } from "react-bootstrap";

const TipTrick = (props) => {
  return (
    <div className="content">
      <h2>TIP & Trick</h2>
      <Container className="tip-container">
        <img
          src="https://i.pinimg.com/736x/89/f7/25/89f725cdfb26583b89d6d4f7c4465131.jpg"
          alt="Why get health insurance?"
        />
      </Container>
      <Container className="tip-container">
        <img
          src="https://www.investopedia.com/thmb/KypCAQy3LXjVR1MRW5tBe13LVlM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/dotdash-life-vs-health-insurance-choosing-what-buy-Final-b6741f4fd8a3479b81d969f9ea2c9bb3.jpg"
          alt="Life VS Health insurance"
        />
      </Container>
      <Container className="tip-container">
        <img
          src="https://tvinsure.com/wp-content/uploads/2022/06/IPD_%E0%B9%81%E0%B8%A5%E0%B8%B0_OPD_%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3-01.png"
          alt="IPD VS OPD"
        />
      </Container>
    </div>
  );
};

export default TipTrick;
