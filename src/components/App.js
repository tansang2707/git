import React from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import Header from "./Header/Header";
import Routes from "../routes";
import { fetchCategories } from "../modules/category";
import { getMe } from "../modules/auth";
import RouterView from "../utils/RouterView";
import "antd/dist/antd.css";
import "../scss/style.scss";
import MiniCart from "./MiniCart/MiniCart";
import Footer from "./Footer/Footer";

if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line import/no-extraneous-dependencies
  // eslint-disable-next-line global-require
  const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");
  whyDidYouRender(React);
}

class App extends React.Component {
  async componentDidMount() {
    const { doFetchCategories, doGetMe } = this.props;
    await doFetchCategories();
    await doGetMe(); // Fetch user information && cart
  }

  renderRoutes = () =>
    Routes.map(({ path, component, isPrivate }) => (
      <RouterView
        path={path}
        isPrivate={isPrivate}
        component={component}
        key={path}
        exact
      />
    ));

  render() {
    return (
      <Layout className="layout">
        <Header />
        <Layout.Content style={{ marginTop: "64px", background: "#fff" }}>
          <MiniCart />
          <Switch>{this.renderRoutes()}</Switch>
        </Layout.Content>
        <Layout.Footer style={{ padding: "24px 0", background: "#fff" }}>
          <Footer />
        </Layout.Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  visible: state.cart.cartShow
});

export default connect(mapStateToProps, {
  doFetchCategories: fetchCategories,
  doGetMe: getMe
})(App);
