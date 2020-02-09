import React, { Component } from "react";

import { Form, Input, Row, Col, Button, Divider } from "antd";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { removeFromCart } from "../../modules/cart";

import "./Checkout.scss";
import MiniCartItem from "../../components/MiniCart/MiniCartItem";
import { moneyFormat } from "../../utils";

class Checkout extends Component {
  componentDidMount() {}

  renderInput = ({ input, label, meta, type, placeholder }) => {
    let styled = {};
    if (meta.touched && meta.error) {
      styled = { validateStatus: "error", help: meta.error };
    } else if (meta.touched) {
      styled = { validateStatus: "success" };
    }
    return (
      <>
        <Form.Item label={label} hasFeedback {...styled}>
          {type === "password" ? (
            <Input.Password allowClear {...input} placeholder={placeholder} />
          ) : (
            <Input {...input} placeholder={placeholder} />
          )}
        </Form.Item>
      </>
    );
  };

  render() {
    const { doPush, doRemoveFromCart, cart } = this.props;
    const { products } = cart;

    const flatPrice =
      products && products.map(p => p.quantity * p.product.price);

    const totalPrice =
      (flatPrice.length > 0 &&
        flatPrice.reduce((total, current) => {
          const temp = total + current;
          return temp;
        })) ||
      0;

    const shippingFee = 0;

    return (
      <div className="container m2t">
        <Form>
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <h2 className="text-styled">Billing Information</h2>
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Field
                    name="firstName"
                    component={this.renderInput}
                    label="First Name"
                    placeholder="Enter your first name"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <Field
                    name="lastName"
                    component={this.renderInput}
                    label="Last Name"
                    placeholder="Enter your last name"
                  />
                </Col>
              </Row>
              <Field
                name="address"
                component={this.renderInput}
                label="Address"
                placeholder="Enter your address"
              />
              <Row>
                <Col xs={24} lg={12}>
                  <Field
                    name="phoneNumber"
                    component={this.renderInput}
                    label="Phone Number"
                    placeholder="Enter your phone number"
                  />
                </Col>
              </Row>
              {/* <Row>
                <Col xs={24} lg={12}>
                  Payment type
                </Col>
              </Row> */}
              <Button onClick={() => doPush("/")}>Go back</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: 24 }}
              >
                Checkout
              </Button>
            </Col>
            <Col xs={24} lg={8}>
              <h2 className="text-styled">Products</h2>
              <MiniCartItem
                products={products}
                removeFromCart={doRemoveFromCart}
              />
              <Divider />
              <Row>
                <Col xs={12}>
                  <b>Products Total</b>
                </Col>
                <Col xs={12} className="text-right">
                  {moneyFormat(totalPrice)}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <b>Shipping Fee</b>
                </Col>
                <Col xs={12} className="text-right">
                  {moneyFormat(shippingFee)}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <b>Total</b>
                </Col>
                <Col xs={12} className="text-right">
                  {moneyFormat(totalPrice + shippingFee)}
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const formWrap = reduxForm({
  form: "checkoutForm"
})(Checkout);

const mapStateToProps = state => ({ cart: state.cart });

export default connect(mapStateToProps, {
  doPush: push,
  doRemoveFromCart: removeFromCart
})(formWrap);
