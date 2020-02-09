import React from "react";
import { Button, Drawer, Popconfirm, message, List, Avatar, Icon } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { toggleMiniCart, removeFromCart } from "../actions";
import { moneyFormat } from "../utils";

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
      return message.error("Đăng nhập trước khi checkout");
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
        <List
          itemLayout="horizontal"
          dataSource={products}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="Are you sure to delete this item?"
                  onConfirm={() => doremoveFromCart(item.product._id)}
                >
                  <Icon type="close" />
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={64}
                    src={`${process.env.REACT_APP_PRODUCT_URL}/${item.product.photo[0]}`}
                  />
                }
                title={item.product.name}
                description={`x ${item.quantity}`}
              />
            </List.Item>
          )}
        />
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
