import React, { Component } from "react";
import { Carousel, Rate } from "antd";
import "./feedback.scss";

class FeedBack extends Component {
  state = {
    value: 3
  };
  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="feedback">
        <Carousel autoplay>
          <div className="feedback-item">
            {/* avatar */}
            <div className="feedback-item__avatar">
              <img src="/img/1.jpg" alt="" />
            </div>

            {/* name */}
            <h3>Tony Stark</h3>
            {/* rate */}
            <div className="feedback-item__rate">
              <span>
                <Rate onChange={this.handleChange} value={value} />
              </span>
            </div>
            {/* content */}
            <div className="feedback-item__content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="feedback-item">
            {/* avatar */}
            <div className="feedback-item__avatar">
              <img src="/img/2.jpg" alt="" />
            </div>

            {/* name */}
            <p>Tony Stark</p>
            {/* rate */}
            <div className="feedback-item__rate">
              <span>
                <Rate onChange={this.handleChange} value={value} />
              </span>
            </div>
            {/* content */}
            <div className="feedback-item__content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="feedback-item">
            {/* avatar */}
            <div className="feedback-item__avatar">
              <img src="/img/3.jpg" alt="" />
            </div>

            {/* name */}
            <p>Tony Stark</p>
            {/* rate */}
            <div className="feedback-item__rate">
              <span>
                <Rate onChange={this.handleChange} value={value} />
              </span>
            </div>
            {/* content */}
            <div className="feedback-item__content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="feedback-item">
            {/* avatar */}
            <div className="feedback-item__avatar">
              <img src="/img/4.jpg" alt="" />
            </div>

            {/* name */}
            <p>Tony Stark</p>
            {/* rate */}
            <div className="feedback-item__rate">
              <span>
                <Rate onChange={this.handleChange} value={value} />
              </span>
            </div>
            {/* content */}
            <div className="feedback-item__content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
          <div className="feedback-item">
            {/* avatar */}
            <div className="feedback-item__avatar">
              <img src="/img/5.jpg" alt="" />
            </div>

            {/* name */}
            <p>Tony Stark</p>
            {/* rate */}
            <div className="feedback-item__rate">
              <span>
                <Rate onChange={this.handleChange} value={value} />
              </span>
            </div>
            {/* content */}
            <div className="feedback-item__content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default FeedBack;
