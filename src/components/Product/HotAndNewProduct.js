import React, { Component } from "react";
import { Row } from "antd";
import HotProduct from "./HotProduct";
import NewProduct from "./NewProduct";
import "./product-item.scss";
class HotAndNewProduct extends Component {
  state = {};
  render() {
    return (
      <div className="hot-and-new-product">
        <Row>
          <HotProduct />
          <NewProduct />
        </Row>
      </div>
    );
  }
}

export default HotAndNewProduct;
