import React, { Component } from 'react';
import { Card, Image, Header, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart';

const Product = ({ data }) => {
  if (!data)
    return (
      <Card>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
      </Card>
    );

  return (
    <Card>
      <Image
        src={`http://localhost:3001/uploads/products/${data.photo[0]}`}
        as={Link}
        to={`/products/${data.slug}`}
      />
      <Card.Content as={Link} to={`/products/${data.slug}`}>
        <Card.Header>{data.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Header floated="left" color="teal" size="huge">
          <Header.Subheader className="overstrike" color="grey">
            {new Intl.NumberFormat().format(data.price)} đ
          </Header.Subheader>
          {new Intl.NumberFormat().format(data.price)} đ
        </Header>
        <AddToCart />
      </Card.Content>
    </Card>
  );
};

export default Product;
