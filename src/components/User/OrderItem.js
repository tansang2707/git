import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { moneyFormat } from "../../utils";
const OrderItem = ({ data }) => {
  if (!data) return null;
  //in ra tung order
  const { cart } = data;
  if (cart && cart.length > 0) {
    const total =
      cart &&
      cart
        .map(product => product.quantity * product.product.price)
        .reduce((total = 0, item) => (total += item));
    return (
      <tr>
        <td>
          <Link to={`/users/orderHistory/${data._id}`}>{data._id}</Link>
        </td>
        <td>{moment(data.createdAt).format("l")}</td>
        <td>{moneyFormat(total)}</td>
        <td style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          <p
            style={
              data.status === "cancel"
                ? { color: "#c0392b" }
                : data.status === "pending"
                ? { color: "#f1c40f" }
                : { color: "#2ecc71" }
            }
          >
            {data.status}
          </p>
        </td>
      </tr>
    );
  }
};
export default OrderItem;
