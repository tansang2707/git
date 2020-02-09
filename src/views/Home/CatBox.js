import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import nprogress from "nprogress";
import { fetchProducts } from "../../actions";
import sliderBackground from "../../assets/img/slider.jpg";
import Product from "../../components/Product/Product";

class CatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: "banh-truyen-thong-viet-nam",
      limit: 8,
      list: []
    };
  }

  async componentDidMount() {
    await this.handleGetData();
  }

  handleGetData = async () => {
    const { cat, limit } = this.state;
    nprogress.start();
    const response = await fetchProducts(`category.slug=${cat}&limit=${limit}`);
    this.setState({ list: response.data.docs });
    nprogress.done();
  };

  handleChangeCategory = async cat => {
    await this.setState({ cat });
    await this.handleGetData();
  };

  renderCategoriesList = () => {
    const { categories } = this.props;
    const { cat } = this.state;
    const data = _.chunk(categories, 4);
    const tmp = data.map(row => {
      return row.map(category => {
        return (
          <Col xs={24} sm={12} lg={6} key={category.slug}>
            <div
              className={`catbox__box ${category.slug === cat ? "active" : ""}`}
              style={{
                background: `url(${sliderBackground})`,
                backgroundSize: "cover"
              }}
              onClick={() => this.handleChangeCategory(category.slug)}
            >
              {category.name}
            </div>
          </Col>
        );
      });
    });

    return tmp.map(f => {
      return (
        <Row key={Math.random()} gutter={[16, 16]}>
          {f}
        </Row>
      );
    });
  };

  renderProductList = () => {
    const { list } = this.state;
    const data = _.chunk(list, 4);
    if (!list) {
      return (
        <div>
          <div>There is nothing</div>
        </div>
      );
    }
    const tmp = data.map(row => {
      return row.map(product => {
        return (
          <Col xs={24} sm={12} lg={6} key={product.slug}>
            <Product data={product} />
          </Col>
        );
      });
    });

    return tmp.map(f => {
      return (
        <Row key={Math.random()} gutter={[16, 16]}>
          {f}
        </Row>
      );
    });
  };

  render() {
    return (
      <div className="container catbox">
        {/* <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <div
              className="catbox__box active"
              style={{
                background: `url(${sliderBackground})`,
                backgroundSize: "cover"
              }}
            >
              CATEGORY
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div
              className="catbox__box"
              style={{
                background: `url(${sliderBackground})`,
                backgroundSize: "cover"
              }}
            >
              CATEGORY
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div
              className="catbox__box"
              style={{
                background: `url(${sliderBackground})`,
                backgroundSize: "cover"
              }}
            >
              CATEGORY
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div
              className="catbox__box"
              style={{
                background: `url(${sliderBackground})`,
                backgroundSize: "cover"
              }}
            >
              CATEGORY
            </div>
          </Col>
        </Row> */}
        {this.renderCategoriesList()}
        {this.renderProductList()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.categories });

export default connect(mapStateToProps)(CatBox);
