import React from 'react';
import {
  Container,
  Grid,
  Placeholder,
  Header,
  Image,
  Input
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../../actions';

class ProductDetail extends React.Component {
  componentDidMount = () => {
    this.props.fetchProduct(this.props.match.params.slug);
  };

  renderPlaceHolder = () => {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Placeholder style={{ height: '500px', width: '100%' }}>
            <Placeholder.Image
              centered
              style={{ width: '100%' }}
            ></Placeholder.Image>
          </Placeholder>
        </Grid.Column>
        <Grid.Column>
          <Placeholder>
            <Placeholder.Line length="very short"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
          </Placeholder>
        </Grid.Column>
      </Grid>
    );
  };

  renderProduct = () => {
    const { product } = this.props;
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Image
            centered
            src={`http://localhost:3001/uploads/products/${product.photo[0]}`}
          />
        </Grid.Column>
        <Grid.Column>
          <Header sub color="grey">
            {product.category.name}
          </Header>
          <Header size="huge" className="textHeading">
            {product.name}
          </Header>
          <Header size="large" color="teal">
            <Header sub className="overstrike" color="grey">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.price)}
            </Header>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(product.price)}
          </Header>
          <p basic>
            Erat orci consectetur consectetur consectetur eleifend habitasse est
            non aenean accumsan risus adipiscing laoreet risus. Libero sed
            consectetur sit taciti montes suspendisse adipiscing a ligula
            adipiscing arcu rutrum in praesent nec suspendisse a nec condimentum
            eu elementum. Mauris mollis a per ipsum nulla eget consectetur
            egestas iaculis adipiscing at a vestibulum montes sagittis sed
            pharetra lectus massa eu ut fermentum.
          </p>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'cart',
              content: 'Add to cart'
            }}
            type="number"
            defaultValue={1}
          />
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: '100px' }}>
        {this.props.product ? this.renderProduct() : this.renderPlaceHolder()}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  product: state.products[ownProps.match.params.slug]
});
export default connect(
  mapStateToProps,
  { fetchProduct }
)(ProductDetail);
