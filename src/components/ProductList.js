import React from 'react';
import { connect } from 'react-redux';
import { Grid, Container, Card } from 'semantic-ui-react';
import { Result } from 'antd';
import { fetchProducts, unmountProducts } from '../actions';
import Product from './Product/Product';
import Sidebar from './Product/Sidebar';
import nprogress from 'nprogress';

class ProductList extends React.PureComponent {
  static whyDidYouRender = false;

  componentDidMount = async () => {
    await this.fetchProducts();
  };

  componentDidUpdate = async props => {
    if (this.props.match.params.slug !== props.match.params.slug) {
      nprogress.start();
      this.props.unmountProducts();
      await this.fetchProducts();
      nprogress.done();
    }
  };

  componentWillUnmount = () => {
    this.props.unmountProducts();
  };

  fetchProducts = async () => {
    let { page, slug } = this.props.match.params;
    page = page * 1 || 1;
    await this.props.fetchProducts(`category.slug=${slug}&page=${page}`);
  };

  renderProductList = () => {
    if (this.props.products && this.props.products.length > 0)
      return this.props.products.map(product => (
        <Product key={product._id} data={product} />
      ));
    else if (!this.props.products) {
      return (
        <React.Fragment>
          <Product />
          <Product />
          <Product />
        </React.Fragment>
      );
    }
  };

  renderEmptyList = () => {
    if (this.props.products && this.props.products.length === 0)
      return (
        <React.Fragment>
          <Result status="404" title="Dữ liệu đang được cập nhật" />
        </React.Fragment>
      );
  };

  render() {
    return (
      <Container style={{ paddingTop: '24px' }}>
        <Grid>
          <Grid.Column width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={3}>{this.renderProductList()}</Card.Group>
            {this.renderEmptyList()}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.products
  };
};

export default connect(
  mapStateToProps,
  { fetchProducts, unmountProducts }
)(ProductList);
