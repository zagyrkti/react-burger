import rootReducer, { initialState } from './index';
import { createStore } from 'redux';
import {
  INITIAL_ORDER_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_INIT_CONNECTION,
  WS_ON_OPEN
} from '../constants/socket';
import {
  feedMessage,
  ingredientData,
  ingredientDataWithUuidMain,
  ingredientDataWithUuidSauce,
  ingredientListWithUuid,
  ingredientsData,
  placeOrderData,
  userData
} from './mock-data';
import {
  FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  GET_USER_DATA_FAILED, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS,
  LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILED, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
  UPDATE_TOKEN_FAILED, UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS,
  UPDATE_USER_DATA_FAILED, UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS
} from '../constants/user';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INITIAL_INGREDIENT
} from '../constants/ingredients';
import { ADD_INGREDIENT_TO_SELECTED, RESET_SELECTED_INGREDIENT } from '../constants/ingredient-details';
import {
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SWITCH_ORDER_DETAILS_MODAL_STATE
} from '../constants/order';
import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_TOPPING_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR, UPDATE_TOPPING_ORDER
} from '../constants/burger-constructor';


describe('socket reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.socket;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state',  () => {
    expect(getState().socket).toStrictEqual(state);
  })

  test('handle WS_INIT_CONNECTION', () => {
    dispatch({type: WS_INIT_CONNECTION});
    expect(getState().socket).toStrictEqual({
      ...state,
      connecting: true,
      connected: false
    })
  })

  test('handle WS_ON_OPEN', () => {
    dispatch({type: WS_ON_OPEN});
    expect(getState().socket).toStrictEqual({
      ...state,
      connecting: false,
      connected: true
    })
  })

  test('handle WS_CONNECTION_ERROR', () => {
    dispatch({type: WS_CONNECTION_ERROR});
    expect(getState().socket).toStrictEqual({
      ...state,
      connecting: false,
      connected: false
    })
  })

  test('handle WS_CONNECTION_CLOSED', () => {
    dispatch({type: WS_CONNECTION_CLOSED});
    expect(getState().socket).toStrictEqual({
      ...state,
      connected: false,
      message: INITIAL_ORDER_MESSAGE
    })
  })

  test('handle WS_GET_MESSAGE', () => {
    dispatch({type: WS_GET_MESSAGE, payload: feedMessage});
    expect(getState().socket).toStrictEqual({
      ...state,
      message: feedMessage
    })
  })
})

describe('user reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.user;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state', () => {
    expect(getState().user).toStrictEqual(state)
  })

  test('handle UPDATE_USER_DATA_REQUEST', () => {
    dispatch({type: UPDATE_USER_DATA_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle UPDATE_USER_DATA_SUCCESS', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: userData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle UPDATE_USER_DATA_FAILED', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    dispatch({type: UPDATE_USER_DATA_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: initialState.user.userData,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle RESET_PASSWORD_REQUEST', () => {
    dispatch({type: RESET_PASSWORD_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle RESET_PASSWORD_SUCCESS', () => {
    dispatch({type: RESET_PASSWORD_SUCCESS});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle RESET_PASSWORD_FAILED', () => {
    dispatch({type: RESET_PASSWORD_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle FORGOT_PASSWORD_REQUEST', () => {
    dispatch({type: FORGOT_PASSWORD_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isPasswordRecoveryEmailSent: false,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle FORGOT_PASSWORD_SUCCESS', () => {
    dispatch({type: FORGOT_PASSWORD_SUCCESS});
    expect(getState().user).toStrictEqual({
      ...state,
      isPasswordRecoveryEmailSent: true,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle FORGOT_PASSWORD_FAILED', () => {
    dispatch({type: FORGOT_PASSWORD_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      isPasswordRecoveryEmailSent: false,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle GET_USER_DATA_REQUEST', () => {
    dispatch({type: GET_USER_DATA_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle GET_USER_DATA_SUCCESS', () => {
    dispatch({type: GET_USER_DATA_SUCCESS, payload: userData});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: userData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle GET_USER_DATA_FAILED', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    dispatch({type: GET_USER_DATA_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: initialState.user.userData,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle LOGOUT_USER_REQUEST', () => {
    dispatch({type: LOGOUT_USER_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle LOGOUT_USER_SUCCESS', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    dispatch({type: LOGOUT_USER_SUCCESS});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: initialState.user.userData,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle LOGOUT_USER_FAILED', () => {
    dispatch({type: LOGOUT_USER_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle UPDATE_TOKEN_REQUEST', () => {
    dispatch({type: UPDATE_TOKEN_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle UPDATE_TOKEN_SUCCESS', () => {
    dispatch({type: UPDATE_TOKEN_SUCCESS});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle UPDATE_TOKEN_FAILED', () => {
    dispatch({type: UPDATE_TOKEN_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle LOGIN_USER_REQUEST', () => {
    dispatch({type: LOGIN_USER_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle LOGIN_USER_SUCCESS', () => {
    dispatch({type: LOGIN_USER_SUCCESS, payload: userData});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: userData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle LOGIN_USER_FAILED', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    dispatch({type: LOGIN_USER_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: initialState.user.userData,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })

  test('handle REGISTER_USER_REQUEST', () => {
    dispatch({type: REGISTER_USER_REQUEST});
    expect(getState().user).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle REGISTER_USER_SUCCESS', () => {
    dispatch({type: REGISTER_USER_SUCCESS, payload: userData});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: userData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle REGISTER_USER_FAILED', () => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, payload: userData});
    dispatch({type: REGISTER_USER_FAILED});
    expect(getState().user).toStrictEqual({
      ...state,
      userData: initialState.user.userData,
      isRequestSent: false,
      isRequestFailed: true,
    })
  })
})

describe('ingredients reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.ingredients;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state', () => {
    expect(getState().ingredients).toStrictEqual(state)
  })

  test('handle GET_INGREDIENTS_REQUEST', () => {
    dispatch({type: GET_INGREDIENTS_REQUEST});
    expect(getState().ingredients).toStrictEqual({
      ...state,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle GET_INGREDIENTS_SUCCESS', () => {
    dispatch({type: GET_INGREDIENTS_SUCCESS, payload: ingredientsData});
    expect(getState().ingredients).toStrictEqual({
      ...state,
      ingredients: ingredientsData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle GET_INGREDIENTS_FAILED', () => {
    dispatch({type: GET_INGREDIENTS_SUCCESS, payload: ingredientsData});
    dispatch({type: GET_INGREDIENTS_FAILED});
    expect(getState().ingredients).toStrictEqual({
      ...state,
      ingredients: [],
      isRequestSent: false,
      isRequestFailed: true,
    })
  })
})

describe('ingredientDetails reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.ingredientDetails;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state', () => {
    expect(getState().ingredientDetails).toStrictEqual(state)
  })

  test('handle ADD_INGREDIENT_TO_SELECTED', () => {
    dispatch({type: ADD_INGREDIENT_TO_SELECTED, payload: ingredientData});
    expect(getState().ingredientDetails).toStrictEqual({
      ...state,
      selectedIngredient: ingredientData,
    })
  })

  test('handle RESET_SELECTED_INGREDIENT', () => {
    dispatch({type: ADD_INGREDIENT_TO_SELECTED, payload: ingredientData});
    dispatch({type: RESET_SELECTED_INGREDIENT});
    expect(getState().ingredientDetails).toStrictEqual({
      ...state,
      selectedIngredient: INITIAL_INGREDIENT
    })
  })
})

describe('order reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.order;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state', () => {
    expect(getState().order).toStrictEqual(state)
  })

  test('handle PLACE_ORDER_SUCCESS', () => {
    dispatch({type: PLACE_ORDER_SUCCESS, payload: placeOrderData});
    expect(getState().order).toStrictEqual({
      ...state,
      orderDetails: placeOrderData,
      isRequestSent: false,
      isRequestFailed: false,
    })
  })

  test('handle PLACE_ORDER_REQUEST', () => {
    dispatch({type: PLACE_ORDER_SUCCESS, payload: placeOrderData});
    dispatch({type: PLACE_ORDER_REQUEST});
    expect(getState().order).toStrictEqual({
      ...state,
      orderDetails: initialState.order.orderDetails,
      isRequestSent: true,
      isRequestFailed: false,
    })
  })

  test('handle PLACE_ORDER_FAILED', () => {
    dispatch({type: PLACE_ORDER_SUCCESS, payload: placeOrderData});
    dispatch({type: PLACE_ORDER_FAILED});
    expect(getState().order).toStrictEqual({
      ...state,
      orderDetails: initialState.order.orderDetails,
      isRequestSent: false,
      isRequestFailed: true,

    })
  })

  test('handle X', () => {
    dispatch({type: SWITCH_ORDER_DETAILS_MODAL_STATE});
    expect(getState().order).toStrictEqual({
      ...state,
      isModalOpen: true,
    })
    dispatch({type: SWITCH_ORDER_DETAILS_MODAL_STATE});
    expect(getState().order).toStrictEqual({
      ...state,
      isModalOpen: false,
    })
  })
})

describe('burgerConstructor reducer', () => {
  let store;
  let getState;
  let dispatch;
  const state = initialState.burgerConstructor;

  beforeEach(() => {
    store = createStore(rootReducer);
    getState = store.getState;
    dispatch = store.dispatch;
  })

  test('initial state', () => {
    expect(getState().burgerConstructor).toStrictEqual(state)
  })

  test('handle ADD_TOPPING_TO_CONSTRUCTOR', () => {
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    expect(getState().burgerConstructor).toStrictEqual({
      ...state,
      topping: [ingredientDataWithUuidMain],
    })
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    expect(getState().burgerConstructor).toStrictEqual({
      ...state,
      topping: [ingredientDataWithUuidMain, ingredientDataWithUuidMain],
    })
  })

  test('handle ADD_BUN_TO_CONSTRUCTOR', () => {
    dispatch({type: ADD_BUN_TO_CONSTRUCTOR, payload: ingredientData});
    expect(getState().burgerConstructor).toStrictEqual({
      ...state,
      bun: ingredientData,
    })
  })

  test('handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR', () => {
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidSauce});
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    dispatch({type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR, payload: ingredientDataWithUuidSauce.uuid});
    expect(getState().burgerConstructor).toStrictEqual({
      ...state,
      topping: [ingredientDataWithUuidMain, ingredientDataWithUuidMain],
    })
  })

  test('handle UPDATE_TOPPING_ORDER', () => {
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidSauce});
    dispatch({type: ADD_TOPPING_TO_CONSTRUCTOR, payload: ingredientDataWithUuidMain});
    dispatch({type: UPDATE_TOPPING_ORDER, payload: ingredientListWithUuid});
    expect(getState().burgerConstructor).toStrictEqual({
      ...state,
      topping: ingredientListWithUuid,
    })
  })
})