import {
  forgotPasswordRequest,
  getIngredients, getUserDataRequest,
  loginRequest,
  logoutUserRequest,
  orderBurger,
  registerRequest, resetPasswordRequest,
  updateTokenRequest, updateUserDataRequest
} from '../../utils/api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies-auxiliary';

const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const getIngredientsAction = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients()
        .then((res) => {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: res.data,
          })
        })
        .catch(() => {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          })
        })
  }
};

const ADD_INGREDIENT_TO_SELECTED = 'ADD_INGREDIENT_TO_SELECTED';
const RESET_SELECTED_INGREDIENT = 'RESET_SELECTED_INGREDIENT';

const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
const SWITCH_ORDER_DETAILS_MODAL_STATE = 'SWITCH_ORDER_DETAILS_MODAL_STATE';

const placeOrderAction = (idList, token) => {
  return function (dispatch) {
    dispatch({ type: PLACE_ORDER_REQUEST });
    orderBurger(idList, token)
        .then((orderData) => {
          if (orderData.success) {
            dispatch({
              type: PLACE_ORDER_SUCCESS,
              payload: orderData,
            })
          } else {
            return new Error('Placing order failed');
          }
        })
        .catch(async (error) => {
          const retryCondition = (error.status === 403 && error.message === 'jwt malformed')
              || (error.status === 403 && error.message === 'jwt expired')

          if (retryCondition && getCookie('refreshToken')) {
            await dispatch(updateTokenAction(getCookie('refreshToken')));
            dispatch(placeOrderAction(idList, getCookie('token')));
          } else {
            dispatch({ type: PLACE_ORDER_FAILED });
            console.log(`%cCatch placeOrderAction ${error?.message}`, 'color: red');
          }
        })
  }
};

const ADD_TOPPING_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
const UPDATE_TOPPING_ORDER = 'UPDATE_TOPPING_ORDER';

const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

const registerUserAction = (registerData) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_USER_REQUEST })
    registerRequest(registerData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: REGISTER_USER_SUCCESS,
              payload: data.user
            })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: REGISTER_USER_FAILED });
          console.log(`%cCatch registerUserAction ${error?.message}`, 'color: red');
        })

  }
};

const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

const loginUserAction = (loginData) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_USER_REQUEST })
    loginRequest(loginData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: data.user
            })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: LOGIN_USER_FAILED });
          console.log(`%cCatch loginUserAction ${error?.message}`, 'color: red');
        })
  }
};

const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

const updateTokenAction = (token) => {
  return function (dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    return updateTokenRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({ type: UPDATE_TOKEN_SUCCESS })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: UPDATE_TOKEN_FAILED });
          console.log(`%cCatch updateTokenAction ${error?.message}`, 'color: red');
        })
  }
};

const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

const logoutUserAction = (token) => {
  return function (dispatch) {
    dispatch({ type: LOGOUT_USER_REQUEST })
    logoutUserRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({ type: LOGOUT_USER_SUCCESS })
            deleteCookie('token');
            deleteCookie('refreshToken');
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: LOGOUT_USER_FAILED });
          console.log(`%cCatch logoutUserAction ${error?.message}`, 'color: red');
        })
  }
};

const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

const getUserDataAction = (token) => {
  return function (dispatch) {
    dispatch({ type: GET_USER_DATA_REQUEST })
    return getUserDataRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: GET_USER_DATA_SUCCESS,
              payload: data.user
            })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch(async (error) => {
          const retryCondition = (error.status === 403 && error.message === 'jwt malformed')
              || (error.status === 403 && error.message === 'jwt expired')

          if (retryCondition && getCookie('refreshToken')) {
            await dispatch(updateTokenAction(getCookie('refreshToken')));
            dispatch(getUserDataAction(getCookie('token')));
          } else {
            dispatch({ type: GET_USER_DATA_FAILED });
            console.log(`%cCatch getUserDataAction ${error?.message}`, 'color: red');
          }
        })
  }
};

const UPDATE_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const UPDATE_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const UPDATE_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

const updateUserDataAction = (token, userData) => {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_DATA_REQUEST })
    return updateUserDataRequest(token, userData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: UPDATE_USER_DATA_SUCCESS,
              payload: data.user
            })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch(async (error) => {
          const retryCondition = (error.status === 403 && error.message === 'jwt malformed')
          || (error.status === 403 && error.message === 'jwt expired')

          if (retryCondition && getCookie('refreshToken')) {
            await dispatch(updateTokenAction(getCookie('refreshToken')));
            dispatch(updateUserDataAction(getCookie('token'), userData));
          } else {
            dispatch({ type: UPDATE_USER_DATA_FAILED });
            console.log(`%cCatch getUserDataAction ${error?.message}`, 'color: red');
          }
        })
  }
};

const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

const forgotPasswordAction = (email) => {
  return function (dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    return forgotPasswordRequest(email)
        .then((data) => {
          if (data.success) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
          console.log(`%cCatch forgotPasswordAction ${error?.message}`, 'color: red');
        })
  }
};

const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

const resetPasswordAction = (resetData) => {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    resetPasswordRequest(resetData)
        .then((data) => {
          if (data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: RESET_PASSWORD_FAILED });
          console.log(`%cCatch resetPasswordAction ${error?.message}`, 'color: red');
        })
  }
};


export {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  resetPasswordAction,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  forgotPasswordAction,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  updateUserDataAction,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  getUserDataAction,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  logoutUserAction,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  updateTokenAction,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  loginUserAction,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  registerUserAction,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  getIngredientsAction,
  ADD_INGREDIENT_TO_SELECTED,
  RESET_SELECTED_INGREDIENT,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAILED,
  SWITCH_ORDER_DETAILS_MODAL_STATE,
  placeOrderAction,
  ADD_TOPPING_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  UPDATE_TOPPING_ORDER,
}
