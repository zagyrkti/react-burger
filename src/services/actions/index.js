import { getIngredients, orderBurger } from '../../utils/api';

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
const SWITCH_INGREDIENT_DETAILS_MODAL_STATE = 'SWITCH_INGREDIENT_DETAILS_MODAL_STATE';
const RESET_SELECTED_INGREDIENT = 'RESET_SELECTED_INGREDIENT';

const PLACE_ORDER_REQUEST = 'PLACE_ORDER_REQUEST';
const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
const PLACE_ORDER_FAILED = 'PLACE_ORDER_FAILED';
const SWITCH_ORDER_DETAILS_MODAL_STATE = 'SWITCH_ORDER_DETAILS_MODAL_STATE';

const placeOrderAction = (idList) => {
  return function (dispatch) {
    dispatch({ type: PLACE_ORDER_REQUEST });
    orderBurger(idList)
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
        .catch(() => dispatch({ type: PLACE_ORDER_FAILED }));
  }
};


const ADD_TOPPING_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
const UPDATE_TOPPING_ORDER = 'UPDATE_TOPPING_ORDER';
const CALCULATE_CONSTRUCTOR_TOTAL = 'CALCULATE_CONSTRUCTOR_TOTAL';

export {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  getIngredientsAction,
  ADD_INGREDIENT_TO_SELECTED,
  SWITCH_INGREDIENT_DETAILS_MODAL_STATE,
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
  CALCULATE_CONSTRUCTOR_TOTAL,
}
