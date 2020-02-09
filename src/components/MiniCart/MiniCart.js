import React from "react";
import { Button, Drawer, message } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toggleMiniCart, removeFromCart } from "../../modules/cart";
import { moneyFormat } from "../../utils";
import MiniCartItem from "./MiniCartItem";

class MiniCart extends React.Component {
  renderTotal = () => {
    const { products } = this.props;
    if (products && products.length > 0)
      return products
        .map(item => item.product.price * item.quantity)
        .reduce((total = 0, current) => total + current);
    return 0;
  };

  handleSubmit = () => {
    const { isSignedIn, doPush, dotoggleMiniCart } = this.props;
    if (!isSignedIn) {
      return message.error("Please login before doing this action!");
    }
    dotoggleMiniCart(false);
    return doPush("/checkout");
  };

  render() {
    const {
      products,
      doremoveFromCart,
      dotoggleMiniCart,
      cartShow
    } = this.props;
    return (
      <Drawer
        title={
          <Button.Group>
            <Button>{moneyFormat(this.renderTotal())}</Button>
            <Button onClick={() => this.handleSubmit()} type="primary">
              Checkout
            </Button>
          </Button.Group>
        }
        width={350}
        placement="right"
        closable
        onClose={() => dotoggleMiniCart(false)}
        visible={cartShow}
        bodyStyle={{ position: "relative" }}
      >
        <MiniCartItem products={products} removeFromCart={doremoveFromCart} />
      </Drawer>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.cart, ...state.auth };
};

export default connect(mapStateToProps, {
  dotoggleMiniCart: toggleMiniCart,
  doremoveFromCart: removeFromCart,
  doPush: push
})(MiniCart);
