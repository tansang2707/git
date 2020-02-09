import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import categoriesReducer from "./categoriesReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

export const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    form: formReducer,
    categories: categoriesReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer
  });
