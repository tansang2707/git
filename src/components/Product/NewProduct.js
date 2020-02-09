import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPopularProduct } from "../../actions";
import { Col } from "antd";
import ProductItem from "./ProductItem";
class NewProduct extends Component {
  state = {};
  componentDidMount() {
    this.props.fetchPopularProduct();
  }
  renderHotProduct = () => {
    const { popularProducts } = this.props;
    let index = 3;
    const array = [];
    if (popularProducts) {
      while (index < 6) {
        array.push(popularProducts[index]);
        index++;
      }
      return array.map(product => (
        <ProductItem key={product._id} data={product} />
      ));
    }
  };
  render() {
    return (
      <div>
        <Col span={12}>
          <div className="new-cake-title">
            <h1>NEW CAKE</h1>
          </div>
          <div>{this.renderHotProduct()}</div>
        </Col>
      </div>
    );
  }
}
const mapStatetoProps = state => ({ ...state.products });

export default connect(mapStatetoProps, { fetchPopularProduct })(NewProduct);
