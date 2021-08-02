import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_ERROR,
} from "../constant/review.constant";

export const addReviewReducer = (state = { addReview: [] }, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return {
        addReviewLoading: true,
        addReview: [],
      };

    case ADD_REVIEW_SUCCESS:
      return {
        addReviewLoading: false,
      };

    case ADD_REVIEW_ERROR:
      return {
        addReviewLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
