import React from "react";
import { Carousel } from "antd";
import "./Banner.scss";
import sliderBackground from "../../assets/img/slider.jpg";

const Banner = () => {
  return (
    <Carousel className="banner" effect="fade">
      <div style={{ background: "#000" }}>
        {/* <div className="overlay" /> */}
        <div
          className="slide-img"
          style={{
            backgroundImage: `url(${sliderBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        >
          <h3 className="text-styled text-heading">
            Let&lsquo;s party with us
          </h3>
          <h5>Hello, there :)</h5>
        </div>
      </div>
      <div>
        <div
          className="slide-img"
          style={{
            backgroundImage: `url(${sliderBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        />
      </div>
      <div>
        <div
          className="slide-img"
          style={{
            backgroundImage: `url(${sliderBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
          }}
        />
      </div>
    </Carousel>
  );
};

export default Banner;
