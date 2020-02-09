import React, { Component } from "react";
import {
  Row,
  Col,
  Rate,
  Icon,
  InputNumber,
  Button,
  Divider,
  // Carousel,
  Tabs,
  Skeleton,
  message
} from "antd";
import { Link } from "react-router-dom";

import "./ProductDetail.scss";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import ProductReview from "./ProductReview";
import { fetchProduct } from "../../modules/product";
import { addToCart } from "../../modules/cart";
import { moneyFormat } from "../../utils";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
  }

  async componentDidMount() {
    const { match, doPush } = this.props;
    const { slug } = match.params;
    const response = await fetchProduct(slug);
    const { data } = response;

    if (response.status && data.docs.length > 0) {
      return this.setState({ product: data.docs[0] });
    }
    return doPush("/");
  }

  handleChange = value => {
    this.setState({ quantity: value });
  };

  handleAddToCart = async (id, quantity) => {
    const { doAddToCart } = this.props;
    const response = await doAddToCart(id, quantity);
    if (!response.status) return message.error(response.message);
    return message.success("Added to cart successfully");
  };

  renderPrice = product => {
    const { discountPrice, price } = product;
    if (discountPrice)
      return (
        <>
          <div className="product-detail__price--sellPrice">
            {moneyFormat(discountPrice)}
          </div>
          <div className="product-detail__price--oldPrice">
            {moneyFormat(price)}
          </div>
        </>
      );
    return (
      <div className="product-detail__price--sellPrice">
        {moneyFormat(price)}
      </div>
    );
  };

  render() {
    const { product, quantity } = this.state;
    if (!product) {
      return (
        <div className="container product-detail">
          <Row className="pt">
            <Col xs={24} lg={12}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Col>
            <Col xs={24} lg={12}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </Col>
          </Row>
        </div>
      );
    }

    return (
      <div className="container product-detail">
        <Row className="pt">
          <Col xs={24} lg={12} className="text-center">
            {/* <Carousel> */}
            {product.photo.map(img => (
              <img
                key={img}
                src={`${process.env.REACT_APP_PRODUCT_URL}/${img}`}
                alt={product.name}
              />
            ))}
            {/* </Carousel> */}
          </Col>
          <Col xs={24} lg={12}>
            {/* Name */}
            <div className="product-detail__category">
              From{" "}
              <Link to={`/categories/${product.category.slug}`}>
                {product.category.name}
              </Link>
            </div>
            <div className="product-detail__name text-styled">
              {product.name}
            </div>
            <Rate
              disabled
              defaultValue={3.5}
              allowHalf
              character={<Icon type="heart" />}
              style={{ color: "#0ccda3", fontSize: "16px" }}
            />{" "}
            {/* <span className="product-detail__rate">(3.5 - Num of vote)</span> */}
            <div className="product-detail__price">
              {this.renderPrice(product)}
            </div>
            <InputNumber
              max={product.stock}
              min={1}
              value={quantity}
              onChange={this.handleChange}
            />
            <div className="product-detail__actionButton">
              <Button.Group>
                <Button>
                  <Icon type="heart" />
                </Button>
                <Button
                  // eslint-disable-next-line no-underscore-dangle
                  onClick={() => this.handleAddToCart(product._id, quantity)}
                >
                  <Icon type="shopping-cart" />
                  Bỏ vào giỏ hàng
                </Button>
              </Button.Group>
            </div>
            <Divider />
            <div className="short_description">{product.short_description}</div>
            {/* <Divider />
            <div className="product-detail__more">
              <h4>More from the same merchant</h4>
              <Row>
                <Col>
                  <Product />
                </Col>
                <Col>
                  <Product />
                </Col>
              </Row>
            </div> */}
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Tabs animated={false}>
              <Tabs.TabPane key={1} tab="Description">
                {product.description}
              </Tabs.TabPane>
              <Tabs.TabPane key={2} tab="Reviews">
                <ProductReview />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(null, {
  doPush: push,
  doAddToCart: addToCart
})(ProductDetail);
