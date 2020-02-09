import _ from "lodash";
import axios from "../api/axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const FETCH_POPULAR_PRODUCT = "FETCH_POPULAR_PRODUCT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";
export const UNMOUNT_PAGE = "UNMOUNT_PAGE";
export const UNMOUNT_PRODUCT = "UNMOUNT_PRODUCT";

const INIT_STATE = {
  popularProducts: null,
  products: null,
  product: null,
  searchList: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_POPULAR_PRODUCT:
      return { ...state, popularProducts: action.payload.docs };
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload.docs };
    case FETCH_PRODUCT:
      return { ...state, product: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, searchList: action.payload };
    case UNMOUNT_PAGE:
      return { ...state, products: null };
    case UNMOUNT_PRODUCT:
      return { ...state, product: null };
    default:
      return state;
  }
};

// Action creator
// Cache the fetch products
const memFetchProducts = _.memoize(async params => {
  try {
    const response = await axios.get(`/products/getByCat?${params}`);
    const { data } = response.data;
    return { status: true, data };
  } catch (e) {
    console.log(e);
    return { status: false };
  }
});
export const fetchProducts = async params => {
  const data = await memFetchProducts(params);
  return data;
  // try {
  //   const response = await axios.get(`/products/getByCat?${params}`);
  //   // dispatch({ type: FETCH_PRODUCTS, payload: response.data.data });
  //   const { data } = response.data;
  //   return { status: true, data };
  // } catch (e) {
  //   console.log(e);
  //   return { status: false };
  // }
};

export const fetchProduct = async slug => {
  try {
    const response = await axios.get(`/products?slug=${slug}`);
    const { data } = response.data;
    return { status: true, data };
  } catch (e) {
    return { status: false, msg: e };
  }
};

const memFetchPopular = _.memoize(async dispatch => {
  try {
    const response = await axios.get(`/products?sort=-sold&limit=8`);
    dispatch({ type: FETCH_POPULAR_PRODUCT, payload: response.data.data });
  } catch (e) {
    console.log(e);
  }
});

export const fetchPopularProduct = () => async dispatch => {
  await memFetchPopular(dispatch);
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
