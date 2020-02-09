import {
  FETCH_POPULAR_PRODUCT,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  UNMOUNT_PAGE,
  UNMOUNT_PRODUCT,
  SEARCH_PRODUCT
} from '../actions/actionType';

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
