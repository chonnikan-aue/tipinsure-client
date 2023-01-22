import React from "react";
import "./Footer.css";
import { Col, Row } from "react-bootstrap";
import { ImFacebook2, ImTwitter, ImYoutube } from "react-icons/im";

const Footer = (props) => {
  return (
    <Row className="footer">
      <Row className="row-footer">
        <Col md="auto">
          <img
            className="logo-footer"
            src="https://www.tipinsure.com/new_design_5/assets/img/logo.svg"
            alt="tipinsure logo"
          />
        </Col>
        <Col className="call-footer" md="auto">
          Call Center <span className="number-footer">1736</span>
        </Col>
      </Row>
      <Row className="row-footer">
        <Col className="topic-footer" md="auto">
          Follow us #4
          <Row>
            <Col md="auto" className="media-footer">
              <a
                href="https://web.facebook.com/Dhipaya.insurance"
                target="_blank"
                rel="noreferrer"
              >
                <ImFacebook2 />
              </a>
            </Col>
            <Col md="auto" className="media-footer">
              <a
                href="https://twitter.com/tipinsure?lang=th"
                target="_blank"
                rel="noreferrer"
              >
                <ImTwitter />
              </a>
            </Col>
            <Col md="auto" className="media-footer">
              <a
                href="https://www.youtube.com/user/TIPinsure"
                target="_blank"
                rel="noreferrer"
              >
                <ImYoutube />
              </a>
            </Col>
          </Row>
        </Col>
        <Col className="address-footer" md="auto">
          Dhipaya Insurance Public Company Limited
          <br />
          Headquarter : 1115 Rama 3 Road Chong Nonsi,
          <br />
          Yannawa, Bangkok 10120
        </Col>
        <Col className="topic-footer" md="auto">
          Download TIP Insure Application
          <Row>
            <img
              className="download-footer"
              src="https://www.tipinsure.com/new_design_5/assets/img/icon-app.svg"
              alt="application logo"
            />
            <Col>
              <Row>
                <a
                  href="https://appsto.re/th/C6xI-.i"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="download-footer"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                    alt="download on App Store"
                  />
                </a>
              </Row>
              <Row>
                <a
                  href="https://play.google.com/store/apps/details?id=th.co.flexmedia.dhipayaFlashClaim&hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="download-footer"
                    src="https://www.docusign.com/sites/default/files/get-it-on-google-play.png"
                    alt="download on Google Play"
                  />
                </a>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default Footer;
