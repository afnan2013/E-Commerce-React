import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_SAVE_FAIL,
  ORDER_SAVE_REQUEST,
  ORDER_SAVE_SUCCESS,
} from '../constants/orderConstants';

const orderCreateReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case ORDER_SAVE_REQUEST:
      return { loading: true };
    case ORDER_SAVE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { orderCreateReducer, orderDetailsReducer };
