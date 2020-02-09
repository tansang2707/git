import axios from "../api/axios";

export const FETCH_ORDERS = "FETCH_ORDER";
export const FETCH_ORDER_DETAIL = "FETCH_ORDER_DETAIL";
export const UNMOUNT_ORDER_DETAIL = "UNMOUNT_ORDER_DETAI";

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
