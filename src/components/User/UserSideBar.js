import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";
import { signOut } from "../../actions";

class UserSideBar extends Component {
  state = {};
  onSelectHandle = selected => {
    console.log(selected);
    this.props.history.push(`/users/${selected}`);
  };
  signOut = () => {
    const { signOut } = this.props;
    signOut();
  };
  render() {
    return (
      <React.Fragment>
        <Menu vertical>
          <Menu.Item header>User CP</Menu.Item>
          <Menu.Item as={Link} to="/users">
            <Icon name="user" />
            User Profile
          </Menu.Item>
          <Menu.Item as={Link} to="/users/orderHistory">
            <Icon name="ordered list" />
            Order History
          </Menu.Item>
          <Menu.Item as={Link} to="/users/orderTracking">
            <Icon name="search" />
            Order Tracking
          </Menu.Item>
          <Menu.Item>
            <Icon name="heart" />
            Favorite Product
          </Menu.Item>
          <Menu.Item>
            <Icon name="ticket" />
            Coupon
          </Menu.Item>
          <Menu.Item onClick={this.signOut}>
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item header>Support</Menu.Item>
          <Menu.Item>
            <Icon name="wpforms" />
            Support Ticket
          </Menu.Item>
          <Menu.Item>
            <Icon name="send" />
            Submit Support Ticket
          </Menu.Item>
        </Menu>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({ ...state.auth });

export default connect(mapStateToProps, { signOut })(UserSideBar);
