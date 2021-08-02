import {
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANT_FAIL,
  GET_SINGLE_RESTAURANT_REQUEST,
  GET_SINGLE_RESTAURANT_SUCCESS,
  GET_SINGLE_RESTAURANT_FAIL,
} from "../constant/restaurant.constant";

export const getRestaurantReducer = (state = { getRestaurant: [] }, action) => {
  switch (action.type) {
    case GET_ALL_RESTAURANT_REQUEST:
      return {
        getRestaurantLoading: true,
        getRestaurant: [],
      };

    case GET_ALL_RESTAURANT_SUCCESS:
      return {
        getRestaurantLoading: false,
        restaurant: action.payload.result,
      };

    case GET_ALL_RESTAURANT_FAIL:
      return {
        getRestaurantLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const getSingleRestaurantReducer = (
  state = { singleRestaurant: [] },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_RESTAURANT_REQUEST:
      return {
        singleRestaurantLoading: true,
        singleRestaurant: [],
      };

    case GET_SINGLE_RESTAURANT_SUCCESS:
      return {
        singleRestaurantLoading: false,
        srestaurant: action.payload.restaurantDetails,
      };

    case GET_SINGLE_RESTAURANT_FAIL:
      return {
        singleRestaurantLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
