import React, { Component } from "react";
import { Row, Col } from "antd";
import UserSideBar from "./UserSideBar";
import UserProfile from "./UserProfile";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col xs={24} lg={6}>
            <UserSideBar />
          </Col>
          <Col xs={24} lg={18}>
            <UserProfile />
          </Col>
        </Row>
      </div>
    );
  }
}

export default User;
