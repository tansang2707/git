import React, { Component } from "react";
import { Col, Row, Spin, Result } from "antd";
import _ from "lodash";
import { fetchProducts } from "../../modules/product";
import Product from "../../components/Product/Product";
import CategoryTree from "./CategoryTree";
import Blanksvg from "../../assets/img/blank.svg";

class ProductLisdt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  async componentDidMount() {
    await this.doFetchProducts();
  }

  async getSnapshotBeforeUpdate(prevProps) {
    const { match } = this.props;
    if (
      match.params.slug !== prevProps.match.params.slug ||
      match.params.page !== prevProps.match.params.page
    ) {
      this.setState({ products: null });
      await this.doFetchProducts();
    }
  }

  doFetchProducts = async () => {
    const { match } = this.props;
    const { slug } = match.params;
    const response = await fetchProducts(`category.slug=${slug}`);
    const { docs } = response.data;
    this.setState({ products: _.chunk(docs, 3) });
  };

  renderProductList = () => {
    const { products } = this.state;
    if (!products) {
      return (
        <div className="text-center m2t">
          <Spin />
        </div>
      );
    }
    if (products && products.length > 0) {
      const list = products.map(row => {
        return (
          <Row key={Math.random()} gutter={24} style={{ marginBottom: 24 }}>
            {row.map(product => {
              const { _id } = product;
              return (
                <Col xs={24} md={8} key={_id}>
                  <Product data={product} />
                </Col>
              );
            })}
          </Row>
        );
      });
      return (
        <>
          <div>{list}</div>
        </>
      );
    }

    return (
      <div className="text-center">
        <Result
          icon={
            <img
              src={Blanksvg}
              alt="There was no data"
              style={{ maxWidth: "200px" }}
            />
          }
          subTitle="There was no data"
        />
      </div>
    );
  };

  render() {
    return (
      <div className="container mt">
        <Row>
          <Col xs={24} lg={6}>
            <CategoryTree />
          </Col>
          <Col xs={24} lg={18}>
            {this.renderProductList()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductLisdt;
