import axios from 'axios';
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCCESS,
} from '../constants/orderConstants';

export const placeOrder = (order) => async (dispatch, getState) => {
  try {
    if (order) {
      dispatch({ type: ORDER_SAVE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/orders', order, config);
      // console.log(data);
      dispatch({ type: ORDER_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: ORDER_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    if (id) {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      // console.log(data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
