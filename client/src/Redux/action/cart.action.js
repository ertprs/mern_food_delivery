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
import axios from "axios";

export const addToCartAction =
  (cartItems, restaurantId, token) => async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_CART_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/cart/add_to_cart`,
        {
          cartItems: {
            product: cartItems.product,
            quantity: cartItems.quantity,
            price: cartItems.price,
          },
          restaurant: restaurantId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: error.response && error.response.data,
      });
    }
  };

export const getCartAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/cart/get_user_cart`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CART_ERROR,
      payload: error.response && error.response.data,
    });
  }
};

export const decreaseCartItemAction =
  (cartItems, token) => async (dispatch) => {
    try {
      dispatch({ type: DECREASE_CART_ITEM_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/cart/decrease_Cart_Item`,
        {
          cartItems: {
            product: cartItems.product,
            quantity: cartItems.quantity,
            price: cartItems.price,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: DECREASE_CART_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DECREASE_CART_ITEM_ERROR,
        payload: error.response && error.response.data,
      });
    }
  };

export const deleteCartAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CART_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/cart/delete_cart`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: DELETE_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ERROR,
      payload: error.response && error.response.data,
    });
  }
};
