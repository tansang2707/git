import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, toggleMiniCart, searchProduct } from "../actions";
import { Dropdown, Search } from "semantic-ui-react";
import MenuCategories from "./Banner/MenuCategories";

class Header extends React.Component {
  state = {
    loading: false,
    keyword: "",
    results: []
  };

  handleSearchChange = async (e, { value }) => {
    this.setState({ loading: true, keyword: value });
    clearTimeout(window.d);
    window.d = setTimeout(async () => {
      const { searchProduct } = this.props;
      await searchProduct(value);
      const { searchList } = this.props;
      const results = [];
      searchList.forEach(item => {
        results.push({
          title: item.name,
          price: item.price,
          image: `${process.env.REACT_APP_PRODUCT_URL}/${item.photo[0]}`,
          description: item.short_description
        });
      });
      this.setState({ loading: false, results });
    }, 500);
  };

  renderAuth = () => {
    const { isSignedIn, user, signOut } = this.props;
    if (isSignedIn) {
      return (
        <React.Fragment>
          <Dropdown
            className="item"
            text={
              user ? (
                `Hello, ${user.name}!`
              ) : (
                <div className="ui active inline mini loader"></div>
              )
            }
          >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/users">
                <i className="icon coffee"></i> User Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={signOut}>
                <i className="icon shutdown"></i> Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Link className="item" to="/auth/signin">
          Sign In
        </Link>
        <Link className="item" to="/auth/signup">
          Sign Up
        </Link>
      </React.Fragment>
    );
  };
  renderCartCount = () => {
    const { products } = this.props.cart;
    if (products && products.length > 0)
      return products
        .map(item => item.quantity)
        .reduce((total = 0, currentValue) => (total += currentValue));
    return 0;
  };
  render() {
    const { loading, value, results } = this.state;
    const { toggleMiniCart } = this.props;
    return (
      <header
        className="ui menu fixed borderless"
        style={{ border: "none", borderRadius: "none" }}
      >
        <div className="ui container">
          <div className="header item logo">
            <Link className="text teal" to="/">
              SHOPINE
            </Link>
          </div>
          <MenuCategories />
          <Link className="item" to="/">
            About
          </Link>
          <div className="item">
            <Search
              results={results}
              loading={loading}
              value={value}
              onSearchChange={this.handleSearchChange}
            />
          </div>
          <div className="ui right floated item">
            {this.renderAuth()}
            <span onClick={() => toggleMiniCart(true)} className="item">
              <i className="icon cart"></i> Cart
              <div className="ui teal label">{this.renderCartCount()}</div>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.auth,
    visible: state.minicartVisible,
    cart: state.cart,
    searchList: state.products.searchList
  };
};

export default connect(mapStateToProps, {
  signOut,
  toggleMiniCart,
  searchProduct
})(Header);
