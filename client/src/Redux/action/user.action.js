import {
  UPDATE_HOME_ADDRESS_REQUEST,
  UPDATE_HOME_ADDRESS_SUCCESS,
  UPDATE_HOME_ADDRESS_ERROR,
  UPDATE_WORK_ADDRESS_SUCCESS,
  UPDATE_WORK_ADDRESS_REQUEST,
  UPDATE_WORK_ADDRESS_ERROR,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  SET_SELECTED_ADDRESS,
} from "../constant/user.constant";
import axios from "axios";

export const updateHomeAddressAction =
  (homeAddress, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_HOME_ADDRESS_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/user/update_home_address`,
        {
          homeAddress: {
            flatno: homeAddress.flatno,
            area: homeAddress.area,
            landmark: homeAddress.landmark,
            address: homeAddress.address,
            latitude: homeAddress.latitude,
            longitude: homeAddress.longitude,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_HOME_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_HOME_ADDRESS_ERROR,
        payload: error.response && error.response.data,
      });
    }
  };

export const updateWorkAddressAction =
  (workAddress, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_WORK_ADDRESS_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/user/update_work_address`,
        {
          workAddress: {
            flatno: workAddress.flatno,
            area: workAddress.area,
            landmark: workAddress.landmark,
            address: workAddress.address,
            latitude: workAddress.latitude,
            longitude: workAddress.longitude,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_WORK_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_WORK_ADDRESS_ERROR,
        payload: error.response && error.response.data,
      });
    }
  };

export const getUserDataAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_DATA_REQUEST });

    const { data } = await axios.get(
      `http://localhost:5000/user/get_user_data`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_DATA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_DATA_ERROR,
      payload: error.response && error.response.data,
    });
  }
};

export const setAddressAction = (selectedAddress) => {
  return {
    type: "SET_SELECTED_ADDRESS",
    payload: selectedAddress,
  };
};
