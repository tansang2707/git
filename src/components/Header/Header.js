import React, { Component } from "react";
import { Menu, Layout, Row, Col, Icon, Input, Badge, Drawer } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { signOut, toggleMiniCart, searchProduct } from "../../actions";
import { signOut } from "../../modules/auth";
import { toggleMiniCart } from "../../modules/cart";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    };
  }

  // Computed
  computedCartCount = () => {
    const { cart } = this.props;
    const { products } = cart;
    if (products && products.length > 0)
      return products
        .map(item => item.quantity)
        .reduce((total = 0, currentValue) => {
          const newTotal = total + currentValue;
          return newTotal;
        });
    return 0;
  };

  renderCategories = () => {
    const { categories } = this.props;
    const cat = [];
    if (categories) {
      categories.map(c => {
        cat.push(
          <Menu.Item key={c.slug}>
            <Link to={`/categories/${c.slug}`}>{c.name}</Link>
          </Menu.Item>
        );
        return c;
      });

      return (
        <Menu.SubMenu
          className="category"
          title={
            <a href="#top">
              Danh mục sản phẩm <Icon type="down" />
            </a>
          }
        >
          {cat}
        </Menu.SubMenu>
      );
    }
    return null;
  };

  // render
  renderAuthenticate = () => {
    const { isSignedIn, user, doSignOut } = this.props;
    if (isSignedIn) {
      return (
        <Menu.SubMenu title={<span>Hello {user.name}</span>}>
          <Menu.Item>
            <Link to="/user">User Profile</Link>
          </Menu.Item>
          <Menu.Item onClick={doSignOut}>Logout</Menu.Item>
        </Menu.SubMenu>
      );
    }
    return [
      <Menu.Item key="Login">
        <Link to="/auth/signin">Đăng nhập</Link>
      </Menu.Item>,
      <Menu.Item key="Register">
        <Link to="/auth/signup">Đăng ký</Link>
      </Menu.Item>
    ];
  };

  render() {
    const { doToggleMiniCart } = this.props;
    const { openDrawer } = this.state;
    return (
      <Layout.Header
        className="pine-header"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Row>
          <Col xs={12} sm={12} lg={4}>
            <div className="logo">
              <Link to="/">
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  alt="PineCake"
                />
              </Link>
            </div>
          </Col>
          <Col xs={0} lg={6} className="autocomplete">
            <Input
              placeholder="Enter your keyword..."
              prefix={<Icon type="search" />}
            />
          </Col>
          <Col xs={0} lg={14} style={{ textAlign: "right" }}>
            <Menu
              className="menu"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item>
                <Link to="/">Trang chủ</Link>
              </Menu.Item>
              {/* <Menu.Item className="category">
                <Link to="/">Danh mục sản phẩm</Link>
              </Menu.Item> */}
              {this.renderCategories()}
              <Menu.Item>Giới thiệu</Menu.Item>
              <Menu.Item>Liên hệ</Menu.Item>
              {/* Authenticate */}
              {/* {this.renderAuthenticate()} */}
              {this.renderAuthenticate()}
              <Menu.Item onClick={() => doToggleMiniCart(true)}>
                <Badge
                  count={this.computedCartCount()}
                  style={{ backgroundColor: "#0ccda3" }}
                >
                  <Icon type="shopping-cart" />
                </Badge>
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            xs={12}
            sm={12}
            lg={0}
            style={{ textAlign: "right", cursor: "pointer" }}
          >
            <Icon
              type="menu"
              onClick={() => this.setState({ openDrawer: !openDrawer })}
            />
          </Col>
        </Row>
        <Drawer
          placement="right"
          closable
          onClose={() => this.setState({ openDrawer: false })}
          visible={openDrawer}
        >
          <Menu
            className="menu"
            mode="vertical"
            style={{ lineHeight: "64px", border: "none" }}
          >
            <Menu.Item>
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item className="category">
              <Link to="/">Danh mục sản phẩm</Link>
            </Menu.Item>
            <Menu.Item>Giới thiệu</Menu.Item>
            <Menu.Item>Liên hệ</Menu.Item>
            {/* Authenticate */}
            {/* {this.renderAuthenticate()} */}
            {this.renderAuthenticate()}
            <Menu.Item onClick={() => toggleMiniCart(true)}>
              <Badge
                count={this.computedCartCount()}
                style={{ backgroundColor: "#0ccda3" }}
              >
                <Icon type="shopping-cart" />
              </Badge>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.auth,
    visible: state.minicartVisible,
    cart: state.cart,
    searchList: state.products.searchList,
    ...state.categories
  };
};

export default connect(mapStateToProps, {
  doSignOut: signOut,
  doToggleMiniCart: toggleMiniCart
})(Header);
