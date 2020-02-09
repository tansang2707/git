import React, { Component } from "react";
import { Row, Col } from "antd";
import Celebrate from "../../assets/img/celebrate.svg";

class SaleBox extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="salebox">
        <div
          className="container"
          style={{
            background: `url(${Celebrate})`,
            backgroundSize: "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Row>
            <Col xs={24} lg={24} className="text-center">
              <h2 className="text-styled text-white text-heading">
                Discount Box
              </h2>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SaleBox;
