import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Card, Row, Col } from "antd";
import Product from "../../components/Product/Product";
import { fetchPopularProduct } from "../../actions";

class PopularProduct extends React.Component {
  componentDidMount = () => {
    const { doFetchPopularProduct } = this.props;
    doFetchPopularProduct();
  };

  renderPopularProducts = () => {
    const { popularProducts } = this.props;
    const prods = _.chunk(popularProducts, 4);

    if (popularProducts) {
      const tmp = prods.map(row => {
        return row.map(product => {
          return (
            <Col
              xs={24}
              sm={12}
              lg={6}
              style={{ marginBottom: 16 }}
              key={product.id}
            >
              <Product data={product} />
            </Col>
          );
        });
      });

      return tmp.map(f => {
        return (
          <Row gutter={16} key={Math.random()}>
            {f}
          </Row>
        );
      });
    }

    return (
      <Row gutter={16}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading />
        </Col>
      </Row>
    );
  };

  render() {
    return (
      <div className="container popular-products">
        <h2 className="text-center text-heading text-styled">
          Popular Products
        </h2>

        {this.renderPopularProducts()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.products });

export default connect(mapStateToProps, {
  doFetchPopularProduct: fetchPopularProduct
})(PopularProduct);
