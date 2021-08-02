import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getRestaurantReducer,
  getSingleRestaurantReducer,
} from "./reducer/restaurant.reducer";
import {
  addToCartReducer,
  decreaseCartItemReducer,
  deleteCartReducer,
  getCartReducer,
} from "./reducer/cart.reducer";
import { addReviewReducer } from "./reducer/review.reducer";
import {
  updateHomeAddressReducer,
  updateWorkAddressReducer,
  getUserDataReducer,
  setAddressReducer,
} from "./reducer/user.reducer";

const reducer = combineReducers({
  getRestaurant: getRestaurantReducer,
  getSingleRestaurant: getSingleRestaurantReducer,
  addToCart: addToCartReducer,
  addReview: addReviewReducer,
  getCart: getCartReducer,
  decreaseCartItem: decreaseCartItemReducer,
  deleteCart: deleteCartReducer,
  updateHomeAddress: updateHomeAddressReducer,
  updateWorkAddress: updateWorkAddressReducer,
  getUserData: getUserDataReducer,
  setAddress: setAddressReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
