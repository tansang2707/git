import React from "react";
import { List, Popconfirm, Icon, Avatar } from "antd";

const MiniCartItem = props => {
  const { products, removeFromCart } = props;
  return (
    <List
      itemLayout="horizontal"
      dataSource={products}
      renderItem={item => (
        <List.Item
          actions={[
            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={() => removeFromCart(item.product._id)}
            >
              <Icon type="close" />
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                size={64}
                src={`${process.env.REACT_APP_PRODUCT_URL}/${item.product.photo[0]}`}
              />
            }
            title={item.product.name}
            description={`x ${item.quantity}`}
          />
        </List.Item>
      )}
    />
  );
};

export default MiniCartItem;
