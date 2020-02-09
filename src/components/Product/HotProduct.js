import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPopularProduct } from "../../actions";
import { Col } from "antd";
import ProductItem from "./ProductItem";

class HotProduct extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchPopularProduct();
  }
  renderHotProduct = () => {
    const { popularProducts } = this.props;
    let index = 0;
    const array = [];
    if (popularProducts) {
      while (index < 3) {
        array.push(popularProducts[index]);
        index++;
      }
      return array.map(product => (
        <ProductItem data={product} key={product._id} />
      ));
    }
  };
  render() {
    return (
      <div>
        <Col span={12}>
          <div className="hot-cake-title">
            <h1>HOT CAKE</h1>
          </div>
          <div>{this.renderHotProduct()}</div>
        </Col>
      </div>
    );
  }
}
const mapStatetoProps = state => ({ ...state.products });

export default connect(mapStatetoProps, { fetchPopularProduct })(HotProduct);
