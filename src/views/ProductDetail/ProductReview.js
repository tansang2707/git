import React, { Component } from "react";
import { Tooltip, Icon, Comment, Avatar, Rate } from "antd";
import moment from "moment";

class ProductReview extends Component {
  componentDidMount() {
    console.log("test");
  }

  render() {
    const action = "liked";
    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === "liked" ? "filled" : "outlined"}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>0</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === "disliked" ? "filled" : "outlined"}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: "auto" }}>1</span>
      </span>
    ];
    return (
      <>
        <Comment
          actions={actions}
          author={
            <>
              <b>Han Solo</b>
              <Rate
                defaultValue={3.5}
                allowHalf
                style={{
                  color: "#ff7979",
                  fontSize: "13px",
                  marginLeft: "8px"
                }}
                character={<Icon type="heart" />}
                disabled
              />
            </>
          }
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </>
    );
  }
}

export default ProductReview;
