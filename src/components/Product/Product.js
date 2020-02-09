import React from "react";
import { Card } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { moneyFormat } from "../../utils";
import AddToCart from "./AddToCart";
import "./Product.scss";

const Product = props => {
  const { data, doPush } = props;
  if (data) {
    return (
      <Card
        className="product"
        cover={
          <img
            onClick={() => doPush(`/products/${data.slug}`)}
            className="product-img"
            src={`${process.env.REACT_APP_PRODUCT_URL}/${data.photo[0]}`}
            alt={data.name}
          />
        }
        actions={[<AddToCart product={data} />]}
      >
        <h2
          className="text-center"
          onClick={() => doPush(`/products/${data.slug}`)}
        >
          {data.name}
        </h2>
        <div
          className="text-center"
          onClick={() => doPush(`/products/${data.slug}`)}
        >
          <div className="product__price">{moneyFormat(data.price)}</div>
        </div>
      </Card>
    );
  }
  return <Card loading />;
};

export default connect(null, { doPush: push })(Product);
