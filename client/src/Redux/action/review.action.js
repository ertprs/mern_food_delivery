import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
} from "../constant/review.constant";
import axios from "axios";

export const addReviewAction =
  (id, starRating, comment, token) => async (dispatch) => {
    try {
      dispatch({ type: ADD_REVIEW_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/restaurants/create_restaurant_review/${id}`,
        { rating: starRating, comment: comment },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: ADD_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_REVIEW_ERROR,
        payload: error.response && error.response.data,
      });
    }
  };
