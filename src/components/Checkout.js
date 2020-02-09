import React, { Component } from "react";
import {
  Grid,
  Form,
  Button,
  Container,
  Item,
  Header,
  Modal,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import { checkOut, fetchCart } from "../actions";
import { moneyFormat } from "../utils";
import "./User/orderdetail.scss";

class Checkout extends Component {
  state = {
    form: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: ""
    },
    error: [],
    success: false,
    modalClose: false
  };

  componentDidMount() {
    fetchCart();
  }

  handleClose = () => {
    this.setState({ modalClose: true });
    this.setState({ success: false });
    this.props.history.push("/");
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  // bat loi tren input ???
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.state;
    const { products } = this.props;
    const key = Object.keys(form);
    const error = [];
    key.forEach(k => {
      if (!form[k]) {
        error.push(`${k} is required`);
      }
    });
    if (!Number(form.phoneNumber)) {
      error.push("phonenumber must be Number");
    }
    if (products.length === 0 || !products) {
      error.push("Your Cart is Null");
    }
    if (error.length === 0) {
      checkOut(form);
      // this.setState({ success: true });
    }
    this.setState({ error });
  };

  renderProduct = () => {
    const { products } = this.props;
    if (products && products.length > 0)
      return products.map(product => (
        <tr key={product._id}>
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
      ));

    return null;
  };

  renderTotal = () => {
    const { products } = this.props;
    if (products && products.length > 0) {
      const total = products
        .map(product => product.quantity * product.product.price)
        .reduce((total = 0, item) => (total += item));
      return (
        <tr>
          <th />
          <th />
          <th>Total:</th>
          <th>
            <p style={{ color: "#e74c3c" }}>{moneyFormat(total)}</p>
          </th>
        </tr>
      );
    }
    return null;
  };

  render() {
    const { form, error } = this.state;
    const e = error.map(message => {
      return <li>{message}</li>;
    });
    return (
      <div>
        <div>
          <ul>{e}</ul>
        </div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Header as="h1">Billing Details</Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={form.firstName}
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name:</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      name="lastName"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Address:</label>
                    <input
                      type="text"
                      placeholder="Address"
                      value={form.address}
                      name="address"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={form.phoneNumber}
                      name="phoneNumber"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Payment Type</label>
                    <Form.Radio checked label="Cod" />
                    <Form.Radio checked={false} label="MoMo" disabled />
                    <Form.Radio checked={false} label="ATM" disabled />
                  </Form.Field>
                  <Button type="submit" style={{ backgroundColor: "#00b5ad" }}>
                    Submit
                  </Button>
                </Form>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h1">Your Order</Header>
                <div className="show-product-order">
                  <table>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                    {this.renderProduct()}
                    {this.renderTotal()}
                  </table>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/*  Hien bang thong bao checkout thanh cong */}
          <Modal
            open={this.state.success}
            style={{ width: "20%", textAlign: "center" }}
          >
            <Modal.Header style={{ color: "#2ecc71" }}>
              Checkout Success!
            </Modal.Header>
            <Modal.Content>
              <Modal.Description style={{ color: "#95a5a6" }}>
                <p>Thank you very much!</p>
              </Modal.Description>
              <Modal.Actions>
                <Button
                  color="green"
                  onClick={this.handleClose}
                  inverted
                  style={{ marginTop: "24px" }}
                >
                  <Icon name="checkmark" /> Got it
                </Button>
              </Modal.Actions>
            </Modal.Content>
          </Modal>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.cart };
};

export default connect(mapStateToProps)(Checkout);
