import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const AddToCart = props => {
  return (
    <React.Fragment>
      <Button basic color="teal" floated="right" size="tiny" icon>
        <Icon name="cart" /> Add To Cart
      </Button>
    </React.Fragment>
  );
};

export default AddToCart;
