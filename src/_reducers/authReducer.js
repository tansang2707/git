import { SIGN_IN, SIGN_OUT, SIGN_UP } from "../actions/actionType";

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
        isSignedIn:
          !action.payload.error && action.type !== SIGN_UP ? true : false,
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
