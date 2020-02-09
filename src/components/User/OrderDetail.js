import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchOrderDetail,
  unmountOrderDetail,
  cancelOrder
} from "../../actions";
import { Icon, message } from "antd";
import { Container, Header, Grid, Item, Button } from "semantic-ui-react";
import "./orderdetail.scss";
import { moneyFormat } from "../../utils";

class OrderDetail extends Component {
  state = {};
  componentDidMount() {
    const { id } = this.props.match.params;
    const { fetchOrderDetail } = this.props;
    fetchOrderDetail(id);
  }
  componentWillUnmount() {
    const { unmountOrderDetail } = this.props;
    unmountOrderDetail();
  }
  renderProduct = () => {
    const { cart } = this.props.order;
    console.log(cart);
    if (!cart) return null;

    return (
      cart &&
      cart.map(product => {
        return (
          <tr>
            <td>
              <Item.Group>
                <Item key={product.product.id}>
                  <Item.Image
                    size="tiny"
                    src={`${process.env.REACT_APP_PRODUCT_URL}/${product.product.photo[0]}`}
                  />

                  <Item.Content verticalAlign="middle">
                    <Item.Header>{product.product.name}</Item.Header>
                  </Item.Content>
                </Item>
              </Item.Group>
            </td>
            <td>{moneyFormat(product.product.price)}</td>
            <td>{product.quantity}</td>
            <td>{moneyFormat(product.quantity * product.product.price)}</td>
          </tr>
        );
      })
    );
  };
  renderTotal = () => {
    const { cart } = this.props.order;
    if (cart && cart.length > 0) {
      const total = cart
        .map(product => product.quantity * product.product.price)
        .reduce((total = 0, item) => (total += item));
      return <p>{moneyFormat(total)}</p>;
    }
    return null;
  };
  handdleClick = async () => {
    const { cancelOrder } = this.props;
    const { id } = this.props.match.params;
    const response = await cancelOrder(id);
    if (response.status) {
      message.success("Cancel Success!");
    } else {
      message.error("Cancel error!");
    }
  };
  render() {
    const {
      status,
      address,
      firstName,
      lastName,
      phoneNumber,
      paymentType
    } = this.props.order;
    return (
      <Container>
        {/* header and status */}

        {/* địa chỉ người người nhận - hình thức thanh toán */}
        {/* Hiển thị các sản phẩm đặt hàng(Sản phẩm(tên sản phẩm), giá, số lượng, tạm tính) */}
        {/* tổng cộng gòm cột tạm tính, phí vận chuyển, tổng tiền */}
        <div className="grid-info">
          <Grid className="grid-info__content">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3">Delivery Address</Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as="h3">Payment Type</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="grid-row">
              <Grid.Column width={8}>
                <Grid.Row style={{ margin: "0 0 12px 0" }}>
                  <b>{`Name: ${firstName} ${lastName}`}</b>
                </Grid.Row>
                <Grid.Row
                  style={{ margin: "0 0 12px 0" }}
                >{`Address: ${address}`}</Grid.Row>
                <Grid.Row
                  style={{ margin: "0 0 24px 0" }}
                >{`Phone Number: ${phoneNumber}`}</Grid.Row>
              </Grid.Column>
              <Grid.Column width={8}>
                <Grid.Row style={{ margin: "0 0 12px 0" }}>
                  {`Payment: `}
                  <b style={{ textTransform: "capitalize" }}>{paymentType}</b>
                </Grid.Row>
                <Grid.Row style={{ margin: "0 0 12px 0" }}>
                  {`Status: `}
                  <b
                    style={
                      status === "cancel"
                        ? { color: "#e74c3c", textTransform: "capitalize" }
                        : status === "pending"
                        ? { color: "#f1c40f", textTransform: "capitalize" }
                        : { color: "#2ecc71", textTransform: "capitalize" }
                    }
                  >
                    {status}
                  </b>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <hr style={{ color: "#eee" }} />
        <div className="show-product-order">
          <table>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {this.renderProduct()}
            <tr>
              <td></td>
              <td></td>
              <th>Total:</th>
              <th>
                <p style={{ color: "#e74c3c" }}>{this.renderTotal()}</p>
              </th>
            </tr>
          </table>
        </div>
        <hr style={{ color: "#eee" }} />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Link
                style={{ fontSize: "14px", marginTop: "12px" }}
                to="/users/orderHistory"
              >
                <Icon type="backward" />
                {` Back to Order History`}
              </Link>
            </Grid.Column>
            <Grid.Column width={8}>
              {status === "pending" ? (
                <div style={{ textAlign: "right" }}>
                  <Button onClick={this.handdleClick}>Cancel</Button>
                </div>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
const mapStatetoProps = state => {
  return { order: state.orders.order };
};
export default connect(mapStatetoProps, {
  fetchOrderDetail,
  unmountOrderDetail,
  cancelOrder
})(OrderDetail);
