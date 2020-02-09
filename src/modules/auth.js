import _ from "lodash";
import axios from "../api/axios";
import { CLEAR_CART, fetchCart } from "./cart";

export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const INIT_STATE = {
  isSignedIn: !!token,
  user: user || null,
  err: null,
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        err: action.payload.error ? action.payload.error : null,
        isSignedIn: !!(!action.payload.error && action.type !== SIGN_UP),
        user: !action.payload.error ? action.payload.user : {}
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null
      };
    default:
      return state;
  }
};

// Action creator
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
    localStorage.setItem(
      "user",
      JSON.stringify(_.pick(response.user, ["id", "email", "name", "active"]))
    );
    await dispatch({ type: SIGN_IN, payload: response });
    await dispatch(fetchCart());
    return { status: true };
  } catch (e) {
    response = e.response.data;
    const err = {};
    if (response.message.toLowerCase().indexOf("email") >= 0)
      err.email = response.message;
    if (response.message.toLowerCase().indexOf("password") >= 0)
      err.password = response.message;

    return { status: false, message: response.message, err };
  }
};

export const signOut = () => async dispatch => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: SIGN_OUT });
  dispatch({ type: CLEAR_CART });
};

// forgot password
export const forgotPassword = async ({ email }) => {
  try {
    await axios.post("users/forgotpassword", { email });
    return { status: true };
  } catch (e) {
    return { status: false, message: e.response.data.message };
  }
};
// RESET PASSWORD
export const resetPassword = async (resetToken, formValues) => {
  try {
    await axios.patch(`users/resetPassword/${resetToken}`, formValues);
    return { status: true };
  } catch (e) {
    return { status: false };
  }
};
export const getMe = () => async dispatch => {
  const currentToken = localStorage.getItem("token");

  if (currentToken) {
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
