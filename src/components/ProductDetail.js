import React from "react";
import {
  Container,
  Grid,
  Placeholder,
  Header,
  Image,
  Input,
  Divider,
  Icon,
  Button,
  Rating,
  Label
} from "semantic-ui-react";
import { message } from "antd";
import { connect } from "react-redux";
import { fetchProduct, unmountProduct, addToCart } from "../actions";

class ProductDetail extends React.Component {
  state = {
    quantity: "1"
  };

  componentDidMount = async () => {
    const { slug } = this.props.match.params;
    await this.props.fetchProduct(slug);
  };

  componentWillUnmount = () => {
    this.props.unmountProduct();
  };

  handleAddToCart = async e => {
    const { addToCart, product } = this.props;
    const { quantity } = this.state;
    if (quantity > product.stock) {
      message.error("exceeded quantity");
    } else {
      const response = await addToCart(product, quantity);
      if (response.status) {
        message.success("Successful added to cart");
      } else message.error(response.message);
      console.log(product);
    }
  };

  onChange = e => {
    const { value } = e.target;
    if (value <= 0) e.target.value = 1;
    const { product } = this.props;
    if (value > product.stock) e.target.value = product.stock;
    this.setState({ quantity: e.target.value });
  };

  renderPlaceHolder = () => {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Placeholder style={{ height: "500px", width: "100%" }}>
            <Placeholder.Image
              centered="true"
              style={{ width: "100%" }}
            ></Placeholder.Image>
          </Placeholder>
        </Grid.Column>
        <Grid.Column>
          <Placeholder>
            <Placeholder.Line length="very short"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very short"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="very long"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
            <Placeholder.Line length="short"></Placeholder.Line>
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
            src={`${process.env.REACT_APP_PRODUCT_URL}/${product.photo[0]}`}
          />
        </Grid.Column>
        <Grid.Column>
          <Header sub color="grey">
            {product.category.name}
          </Header>
          <Header size="huge" className="textHeading">
            {product.name}
          </Header>
          <Rating icon="heart" defaultRating={3} maxRating={5} />
          <Header size="large" color="teal">
            <Header sub className="overstrike" color="grey">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND"
              }).format(product.price)}
            </Header>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND"
            }).format(product.price)}
          </Header>
          <p basic="true">
            Erat orci consectetur consectetur consectetur eleifend habitasse est
            non aenean accumsan risus adipiscing laoreet risus. Libero sed
            consectetur sit taciti montes suspendisse adipiscing a ligula
            adipiscing arcu rutrum in praesent nec suspendisse a nec condimentum
            eu elementum. Mauris mollis a per ipsum nulla eget consectetur
            egestas iaculis adipiscing at a vestibulum montes sagittis sed
            pharetra lectus massa eu ut fermentum.
          </p>
          {product.stock === 0 ? (
            <Label>Out Of Stock</Label>
          ) : (
            <Input
              action={{
                color: "teal",
                labelPosition: "right",
                icon: "cart",
                content: "Add to cart",
                onClick: this.handleAddToCart
              }}
              type="number"
              onChange={this.onChange}
              defaultValue={1}
            />
          )}
          <div style={{ marginTop: "12px" }}>
            <Button icon labelPosition="left" color="red" size="small">
              <Icon name="heart" />
              Add To Wishlist
            </Button>
            <Button icon labelPosition="left" size="small" basic>
              <Icon name="random" />
              Compare
            </Button>
          </div>
          <Divider />
          <Header sub>Share:</Header>
        </Grid.Column>
      </Grid>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: "100px" }}>
        {this.props.product ? this.renderProduct() : this.renderPlaceHolder()}
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.product,
    products: state.cart.products
  };
};
export default connect(mapStateToProps, {
  fetchProduct,
  unmountProduct,
  addToCart
})(ProductDetail);
