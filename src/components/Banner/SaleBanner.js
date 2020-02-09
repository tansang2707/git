import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Image } from "semantic-ui-react";
import "./sale-banner.scss";

class SaleBanner extends Component {
  state = {};
  render() {
    return (
      <div className="sale-banner">
        <div className="sale-banner--title">
          <h4>Making people happy</h4>
          <h3>offer this week</h3>
        </div>
        <div>
          <Row>
            <Col span={12}>
              <div className="sale-banner--item">
                <Image
                  src="./img/banner-1-600x541.jpg"
                  as={Link}
                  to="/products/raspberry-pie"
                />
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <div className="sale-banner--item">
                    <Image
                      src="./img/banner-2.jpg"
                      as={Link}
                      to="/products/raspberry-pie"
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="sale-banner--item">
                    <Image
                      src="./img/banner-3.jpg"
                      as={Link}
                      to="/products/raspberry-pie"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="sale-banner--item">
                  <Image
                    src="./img/banner-4.jpg"
                    as={Link}
                    to="/products/raspberry-pie"
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default SaleBanner;
