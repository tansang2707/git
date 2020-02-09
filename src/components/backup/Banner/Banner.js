import React from 'react';
import { Container } from 'semantic-ui-react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { Icon } from 'semantic-ui-react';

const Banner = () => {
  return (
    <Container fluid className="spaceBottom header__banner">
      <Slider
        autoplay={2000}
        duration={2000}
        nextButton={<Icon name="caret right" color="grey" size="big" />}
        previousButton={<Icon name="caret left" color="grey" size="big" />}
      >
        <div
          className="sliderItem"
          style={{
            background: `url(http://localhost:3001/img/banner_1.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
        <div
          className="sliderItem"
          style={{
            background: `url(http://localhost:3001/img/banner_2.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        ></div>
        <div
          className="sliderItem"
          style={{
            background: `url(http://localhost:3001/img/banner_3.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center'
          }}
        ></div>
      </Slider>
    </Container>
  );
};

export default Banner;
