import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { fetchOrders } from "../../actions";
import { connect } from "react-redux";
import OrderItem from "./OrderItem";
import "./user_order_history.scss";

class UserOrderHistory extends Component {
  state = {};
  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders();
  }
  renderOrderHistory = () => {
    const { orders } = this.props;
    orders.reverse();
    return orders.map(item => {
      return <OrderItem key={item._id} data={item} />;
    });
  };

  render() {
    return (
      <Container>
        <div className="table__orderhistory">
          <table>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
            {this.renderOrderHistory()}
          </table>
        </div>
      </Container>
    );
  }
}

const mapStatetoProps = state => {
  return { orders: state.orders.orders };
};

export default connect(mapStatetoProps, { fetchOrders })(UserOrderHistory);
