import axios from "../api/axios";
import { addItems } from "../utils/cartUtils";

export const TOGGLE_MINICART = "TOGGLE_MINICART";
export const FETCH_CART = "FETCH_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REDUCE_CART_ITEM = "REDUCE_CART_ITEM";
export const INCREASE_CART_ITEM = "INCREASE_CART_ITEM";
export const CLEAR_CART = "CLEAR_CART";

const initState = {
  products: [],
  cartShow: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return { ...state, products: action.payload };
    case ADD_TO_CART:
      return {
        ...state,
        products: addItems(
          state.products,
          action.payload.product,
          action.payload.quantity
        )
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.filter(
          item => item.product.id !== action.payload
        )
      };
    case TOGGLE_MINICART:
      return { ...state, cartShow: action.payload };
    case CLEAR_CART:
      return { ...state, products: [] };
    default:
      return state;
  }
};

// Action creator

export const toggleMiniCart = visible => dispatch => {
  dispatch({ type: TOGGLE_MINICART, payload: visible });
};

export const addToCart = (product, quantity) => async dispatch => {
  try {
    const { _id } = product;
    await axios.post(`/cart`, {
      productId: _id,
      quantity: Number(quantity)
    });
    dispatch({
      type: ADD_TO_CART,
      payload: { product, quantity }
    });
    return { status: true };
  } catch (e) {
    return { status: false, message: e.response.data.message };
  }
};

export const removeFromCart = productId => async dispatch => {
  await axios.delete(`/cart`, { data: { productId } });

  dispatch({ type: REMOVE_FROM_CART, payload: productId });

  return true;
};

export const fetchCart = () => async dispatch => {
  const response = await axios.get("/cart");
  const { data } = response.data;
  dispatch({ type: FETCH_CART, payload: data });
};
