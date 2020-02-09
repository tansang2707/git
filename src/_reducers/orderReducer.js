import {
  FETCH_ORDERS,
  FETCH_ORDER_DETAIL,
  UNMOUNT_ORDER_DETAIL
} from "../actions/actionType";

const INIT_STATE = {
  orders: [],
  order: {}
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, orders: action.payload };
    case FETCH_ORDER_DETAIL:
      return { ...state, order: action.payload };
    case UNMOUNT_ORDER_DETAIL:
      return { ...state, order: {} };
    default:
      return state;
  }
};
