import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";
import User from "./views/User/User";
import Home from "./views/Home/Home";
import ProductList from "./views/ProductList/ProductList";
import ProductDetail from "./views/ProductDetail/ProductDetail";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ResetPassword from "./views/Auth/ResetPassword";
import Checkout from "./views/Checkout/Checkout";

const Routes = [
  {
    path: "/auth/signin",
    component: SignIn
  },
  {
    path: "/auth/signup",
    component: SignUp
  },
  {
    path: "/auth/forgot-password",
    component: ForgotPassword
  },
  {
    path: "/auth/reset-password/:token",
    component: ResetPassword
  },
  {
    path: "/user",
    component: User,
    isPrivate: true
  },
  {
    path: "/user/:slug/:id?",
    component: User,
    isPrivate: true
  },

  {
    path: "/products/:slug",
    component: ProductDetail
  },
  {
    path: "/categories/:slug/:page?",
    component: ProductList
  },
  {
    path: "/checkout",
    component: Checkout
  },

  {
    path: "/",
    component: Home
  }
];

export default Routes;
