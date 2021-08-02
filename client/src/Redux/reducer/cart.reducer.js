import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  DECREASE_CART_ITEM_REQUEST,
  DECREASE_CART_ITEM_SUCCESS,
  DECREASE_CART_ITEM_ERROR,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_ERROR,
} from "../constant/cart.constant";

export const addToCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        addCartLoading: true,
        cart: [],
      };

    case ADD_TO_CART_SUCCESS:
      return {
        addCartLoading: false,
      };

    case ADD_TO_CART_ERROR:
      return {
        addCartLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const getCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        getCartLoading: true,
        cart: [],
      };

    case GET_CART_SUCCESS:
      return {
        getCartLoading: false,
        userCart: action.payload.userCart,
        cartRestaurant: action.payload.restaurant,
      };

    case GET_CART_ERROR:
      return {
        getCartLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const decreaseCartItemReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case DECREASE_CART_ITEM_REQUEST:
      return {
        decreaseItemLoading: true,
        cart: [],
      };

    case DECREASE_CART_ITEM_SUCCESS:
      return {
        decreaseItemLoading: false,
      };

    case DECREASE_CART_ITEM_ERROR:
      return {
        decreaseItemLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const deleteCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case DELETE_CART_REQUEST:
      return {
        deleteCartLoading: true,
        cart: [],
      };

    case DELETE_CART_SUCCESS:
      return {
        deleteCartLoading: false,
      };

    case DELETE_CART_ERROR:
      return {
        deleteCartLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
