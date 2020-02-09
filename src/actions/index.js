import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  FETCH_CATEGORIES,
  TOGGLE_CATEGORIES,
  FETCH_PRODUCT,
  FETCH_POPULAR_PRODUCT,
  UNMOUNT_PAGE,
  TOGGLE_MINICART,
  UNMOUNT_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  FETCH_CART,
  SEARCH_PRODUCT,
  FETCH_ORDERS,
  FETCH_ORDER_DETAIL,
  UNMOUNT_ORDER_DETAIL
} from "./actionType";
import axios from "../api/axios";
// import _ from 'lodash';

// Authentication Action Creator

export const signUp = formValues => async dispatch => {
  let response = {};
  try {
    response = await axios.post("/users/signup", { ...formValues });
    response = response.data;
  } catch (e) {
    response.error = e.repsonse.data;
  }
  dispatch({ type: SIGN_UP, payload: response });

  return response;
};

export const signIn = formValues => async dispatch => {
  let response;
  try {
    response = await axios.post("/users/login", { ...formValues });
    response = response.data;

    localStorage.setItem("token", response.token);
  } catch (e) {
    response = { error: e.response.data };
    console.log(response);
  }

  dispatch({ type: SIGN_IN, payload: response });
  // Dispatch get cart
  // dispatch()

  return response;
};

export const signOut = () => async dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: SIGN_OUT });
  dispatch({ type: CLEAR_CART });
};

// forgot password
export const forgotPassword = async ({ email }) => {
  try {
    await axios.post("users/forgotpassword", { email });
    return { status: true };
  } catch (e) {
    return { status: false };
  }
};
// RESET PASSWORD
export const resetPassword = async (token, formValues) => {
  try {
    await axios.patch(`users/resetPassword/${token}`, formValues);
    return { status: true };
  } catch (e) {
    return { status: false };
  }
};
export const getMe = () => async dispatch => {
  const token = localStorage.getItem("token");

  if (token) {
    // get User and dispatch
    try {
      const response = await axios.post("/users/me");
      dispatch({ type: SIGN_IN, payload: response.data });
      dispatch(fetchCart());
    } catch (e) {
      dispatch({ type: SIGN_OUT });
    }
  }
};

export const updateProfile = formValues => async dispatch => {
  try {
    await axios.put("/users", formValues);
    dispatch(getMe());
    return { status: true };
  } catch (e) {
    return { status: false };
  }
};

// Categories Action Creator
export const toggleMiniCart = visible => dispatch => {
  dispatch({ type: TOGGLE_MINICART, payload: visible });
};

export const toggleCategories = visible => async dispatch => {
  dispatch({ type: TOGGLE_CATEGORIES, payload: visible });
};

export const fetchCategories = () => async dispatch => {
  let response;
  try {
    response = await axios.get("/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: response.data.data.docs });
  } catch (e) {
    console.log(e);
  }

  return response;
};

// Products Action Creator
// const _fetchProducts = _.memoize(async (params, dispatch) => {});
export const fetchProducts = async params => {
  try {
    const response = await axios.get(`/products/getByCat?${params}`);
    // dispatch({ type: FETCH_PRODUCTS, payload: response.data.data });
    const { data } = response.data;
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
};

export const fetchProduct = slug => async dispatch => {
  try {
    const response = await axios.get(`/products?slug=${slug}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data.data.docs[0] });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }
};

export const fetchPopularProduct = () => async dispatch => {
  try {
    const response = await axios.get(`/products?sort=-sold&limit=8`);
    dispatch({ type: FETCH_POPULAR_PRODUCT, payload: response.data.data });
  } catch (e) {
    console.log(e);
  }
};

export const searchProduct = keyword => async dispatch => {
  try {
    const response = await axios.post("/products/search", { keyword });
    const { data } = response.data;
    dispatch({ type: SEARCH_PRODUCT, payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const unmountProducts = () => dispatch => {
  dispatch({ type: UNMOUNT_PAGE });
};

export const unmountProduct = () => dispatch => {
  dispatch({ type: UNMOUNT_PRODUCT });
};

export const addToCart = (product, quantity) => async dispatch => {
  try {
    await axios.post(`/cart`, {
      productId: product._id,
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

export const checkOut = async formValues => {
  try {
    const response = await axios.post("/orders", formValues); // post('duong dan',body(noi dung),header(neu co))
    console.log(response.data.data);

    return { status: true, data: response.data.data };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
};
// FETCH ORDER
export const fetchOrders = () => async dispatch => {
  try {
    const response = await axios.get("/orders");
    const { data } = response.data;
    dispatch({ type: FETCH_ORDERS, payload: data });
    // console.log(data);
  } catch (e) {
    console.log(e);
  }
};
export const fetchOrderDetail = id => async dispatch => {
  try {
    const response = await axios.get(`/orders/${id}`);
    const { data } = response.data;
    console.log(data);
    dispatch({ type: FETCH_ORDER_DETAIL, payload: data });
  } catch (e) {
    console.log(e);
  }
};
export const unmountOrderDetail = () => dispatch => {
  dispatch({ type: UNMOUNT_ORDER_DETAIL });
};
// cancel order

export const cancelOrder = id => async dispatch => {
  try {
    await axios.put(`/orders/${id}`);
    dispatch(fetchOrderDetail(id));
    return { status: true };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
};
