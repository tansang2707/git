import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Image } from "semantic-ui-react";
import { moneyFormat } from "../../utils";
import AddToCart from "./AddToCart";

class ProductItem extends Component {
  state = {
    isLoading: false
  };
  handleClick = () => {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
  };
  render() {
    const { data } = this.props;

    const origin_price = data.price + 50000;
    return (
      <div>
        <Row>
          <Col span={12}>
            <div className="item-img">
              <Image
                className="item-img--img"
                src={`${process.env.REACT_APP_PRODUCT_URL}/${data.photo[0]}`}
                as={Link}
                to={`/products/${data.slug}`}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="item-content">
              <div className="item-content--name">
                <h3>{data.name}</h3>
                <p>
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fames…
                </p>
              </div>
              <div className="item-content--price">
                <p className="overstrike">{moneyFormat(origin_price)}</p>
                <p>
                  <b>{moneyFormat(data.price)}</b>
                </p>
              </div>
              <div className="item-content--button">
                <AddToCart product={data} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductItem;
