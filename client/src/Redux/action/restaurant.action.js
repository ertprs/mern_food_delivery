import {
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAIL,
  GET_SINGLE_RESTAURANT_REQUEST,
  GET_SINGLE_RESTAURANT_SUCCESS,
  GET_SINGLE_RESTAURANT_FAIL,
} from "../constant/restaurant.constant";
import axios from "axios";

export const allRestaurantAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_RESTAURANT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/restaurants/all_restaurants`
    );

    dispatch({ type: GET_ALL_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_RESTAURANT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const singleRestaurantAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_RESTAURANT_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/restaurants/single_restaurants/${id}`
    );

    dispatch({ type: GET_SINGLE_RESTAURANT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_RESTAURANT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
