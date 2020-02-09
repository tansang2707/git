import React, { Component } from "react";
import { Grid, Container } from "semantic-ui-react";
import { Switch, Router } from "react-router-dom";
import history from "../../history";
import RouterView from "../../utils/RouterView";
import UserProfile from "./UserProfile";
import UserOrderHistory from "./UserOrderHistory";
import OrderDetail from "./OrderDetail";
import UserSideBar from "./UserSideBar";
import OrderTracking from "./OrderTracking";

class User extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <UserSideBar />
            </Grid.Column>
            <Grid.Column width={12}>
              <Router history={history}>
                <Switch>
                  <RouterView path="/users" component={UserProfile} exact />
                  <RouterView
                    path="/users/orderHistory"
                    component={UserOrderHistory}
                    exact
                  />
                  <RouterView
                    path="/users/orderHistory/:id"
                    component={OrderDetail}
                    exact
                  />
                  <RouterView
                    path="/users/orderTracking"
                    component={OrderTracking}
                    exact
                  />
                  <RouterView
                    path="/users/orderTracking/:id"
                    component={OrderTracking}
                    exact
                  />
                </Switch>
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default User;
