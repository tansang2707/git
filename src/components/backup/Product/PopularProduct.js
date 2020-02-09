import React from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';
import Product from './Product';
import { fetchPopularProduct } from '../../actions';

class PopularProduct extends React.Component {
  componentDidMount = () => {
    this.props.fetchPopularProduct();
  };

  renderPopularProducts = () => {
    if (this.props.popularProducts)
      return this.props.popularProducts.map(product => (
        <Product key={product._id} data={product} />
      ));

    return (
      <React.Fragment>
        <Product />
        <Product />
        <Product />
      </React.Fragment>
    );
  };

  render() {
    return (
      <Card.Group itemsPerRow={3}>{this.renderPopularProducts()}</Card.Group>
    );
  }
}

const mapStateToProps = state => ({ ...state.products });

export default connect(
  mapStateToProps,
  { fetchPopularProduct }
)(PopularProduct);
