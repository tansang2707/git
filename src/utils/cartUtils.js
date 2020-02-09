export const addItems = (cartItems, newItem, quantity) => {
  const i = cartItems.findIndex(item => item.product._id === newItem._id);

  if (i >= 0) cartItems[i].quantity += Number(quantity);
  else {
    cartItems.push({ product: newItem, quantity: Number(quantity) });
  }

  return cartItems;
};
