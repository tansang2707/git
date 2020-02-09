import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { Input } from "antd";
import { Router, Switch } from "react-router-dom";
import history from "../../history";
import RouterView from "../../utils/RouterView";
import OrderDetail from "./OrderDetail";

const { Search } = Input;

class OrderTracking extends Component {
  state = {};
  handleSearch = e => {
    this.props.history.push(`/users/orderTracking/${e}`);
  };
  render() {
    return (
      <Container>
        <Header as="h1">OrderTracking</Header>
        <Search
          placeholder="Enter Your Order ID"
          onSearch={this.handleSearch}
          enterButton
          style={{ width: "70%" }}
        />
        <div style={{ margin: "24px 0 0 0" }}>
          <Router history={history}>
            <Switch>
              <RouterView
                path="/users/orderTracking/:id"
                component={OrderDetail}
                exact
              />
            </Switch>
          </Router>
        </div>
      </Container>
    );
  }
}

export default OrderTracking;
