import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";

import auth from "./auth";
import cart from "./cart";
import categories from "./category";
import products from "./product";
import order from "./order";

export default history =>
  combineReducers({
    auth,
    form,
    router: connectRouter(history),
    cart,
    categories,
    products,
    order
  });
