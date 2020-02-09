import React from "react";
import { connect } from "react-redux";
import { Button, Icon, message } from "antd";
import { addToCart } from "../../actions";

class AddToCart extends React.Component {
  state = {
    isLoading: false,
    status: true
  };

  handleAddToCart = async () => {
    const { addToCart, product } = this.props;

    this.setState({ isLoading: true });

    if (this.state.status) {
      const response = await addToCart(product, "1");
      if (response.status) {
        message.success("Successful added to cart");
      } else message.error(response.message);
    } else message.error("Cannot add to cart");
    this.setState({ isLoading: false });
  };
  render() {
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <Button loading={isLoading} onClick={this.handleAddToCart}>
          Add to cart
          <Icon type="shopping-cart" />
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.cart.products };
};

export default connect(mapStateToProps, { addToCart })(AddToCart);
