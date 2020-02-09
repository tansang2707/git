import React from 'react';
import Banner from './Banner/Banner';
import { Container, Header } from 'semantic-ui-react';
import PopularProduct from './Product/PopularProduct';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Banner />
        <Container>
          <Header as="h2" textAlign="center">
            <Header.Content className="textHeading">
              <b>Popular</b> Products
            </Header.Content>
          </Header>
          <PopularProduct />
        </Container>
      </React.Fragment>
    );
  }
}

export default Home;
