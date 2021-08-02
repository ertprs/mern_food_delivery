import {
  UPDATE_HOME_ADDRESS_REQUEST,
  UPDATE_HOME_ADDRESS_SUCCESS,
  UPDATE_HOME_ADDRESS_ERROR,
  UPDATE_WORK_ADDRESS_REQUEST,
  UPDATE_WORK_ADDRESS_SUCCESS,
  UPDATE_WORK_ADDRESS_ERROR,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  SET_SELECTED_ADDRESS,
} from "../constant/user.constant";

export const updateHomeAddressReducer = (
  state = { updateAddress: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_HOME_ADDRESS_REQUEST:
      return {
        updateUserLoading: true,
        updateAddress: [],
      };

    case UPDATE_HOME_ADDRESS_SUCCESS:
      return {
        updateUserLoading: false,
      };

    case UPDATE_HOME_ADDRESS_ERROR:
      return {
        updateUserLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const updateWorkAddressReducer = (
  state = { updateAddress: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_WORK_ADDRESS_REQUEST:
      return {
        updateUserLoading: true,
        updateAddress: [],
      };

    case UPDATE_WORK_ADDRESS_SUCCESS:
      return {
        updateUserLoading: false,
      };

    case UPDATE_WORK_ADDRESS_ERROR:
      return {
        updateUserLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const getUserDataReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return {
        userDataLoading: true,
        user: [],
      };

    case GET_USER_DATA_SUCCESS:
      return {
        userDataLoading: false,
        userDetails: action.payload.user,
      };

    case GET_USER_DATA_ERROR:
      return {
        userDataLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const setAddressReducer = (state = { address: [] }, action) => {
  switch (action.type) {
    case SET_SELECTED_ADDRESS:
      return {
        seleAddress: action.payload,
      };
    default:
      return state;
  }
};
