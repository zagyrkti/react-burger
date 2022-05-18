import { combineReducers } from 'redux';

import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS, UPDATE_TOKEN_FAILED, UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS
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
import { TUserActions } from "../actions/user";
import { IIngredient, IUserData, TOrderData } from "../../shared/types/types";
import { TIngredientsActions } from "../actions/ingredients";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TOrderActions } from "../actions/order";
import { IOrderBurger } from "../../utils/api";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TSocketActions } from "../actions/socket";
import {
  INITIAL_ORDER_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_INIT_CONNECTION,
  WS_ON_OPEN
} from "../constants/socket";


type TUserState = {
  userData: IUserData,
  isPasswordRecoveryEmailSent: boolean,
  isRequestSent: boolean,
  isRequestFailed: boolean,
}

type TIngredientsState = {
  ingredients: Array<IIngredient>,
  isRequestSent: boolean,
  isRequestFailed: boolean,
}

type TIngredientDetailsState = {
  selectedIngredient: IIngredient
}

type TOrderState = {
  orderDetails: IOrderBurger,
  isRequestSent: boolean,
  isRequestFailed: boolean,
  isModalOpen: boolean,
}

type TBurgerConstructorState = {
  bun: IIngredient,
  topping: Array<IIngredient>,
}

type TSocketState = {
  connecting: boolean,
  connected: boolean,
  message: TOrderData,
}

type TInitialState = {
  ingredients: TIngredientsState,
  ingredientDetails: TIngredientDetailsState,
  order: TOrderState,
  burgerConstructor: TBurgerConstructorState,
  user: TUserState,
  socket: TSocketState,
}

export const initialState : TInitialState = {
  ingredients: {
    ingredients: [],
    isRequestSent: false,
    isRequestFailed: false,
  },
  ingredientDetails: {
    selectedIngredient: INITIAL_INGREDIENT,
  },
  order: {
    orderDetails: {
      success: false,
      name: '...loading',
      order: {
        ingredients: [],
        _id: '',
        owner: {
          name: '',
          email: '',
          createdAt: '',
          updatedAt: ''
        },
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: null,
        price: null
      }
    },
    isRequestSent: false,
    isRequestFailed: false,
    isModalOpen: false,
  },
  burgerConstructor: {
    bun: INITIAL_INGREDIENT,
    topping: [],
  },
  user: {
    userData: {
      email: '',
      name: '',
    },
    isPasswordRecoveryEmailSent: false,
    isRequestSent: false,
    isRequestFailed: false,
  },
  socket: {
    connecting: false,
    connected: false,
    message: INITIAL_ORDER_MESSAGE,
  }
}

const socket = (state = initialState.socket, action: TSocketActions): TSocketState => {
  switch (action.type) {
    case WS_INIT_CONNECTION:
      return {
        ...state,
        connecting: true,
        connected: false
      };

    case WS_ON_OPEN:
      return {
        ...state,
        connecting: false,
        connected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        connecting: false,
        connected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
        message: INITIAL_ORDER_MESSAGE
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
}

const user = (state = initialState.user, action : TUserActions) : TUserState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isPasswordRecoveryEmailSent: false,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isPasswordRecoveryEmailSent: true,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isPasswordRecoveryEmailSent: false,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case UPDATE_USER_DATA_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case UPDATE_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        userData: initialState.user.userData,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case GET_USER_DATA_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case GET_USER_DATA_FAILED:
      return {
        ...state,
        userData: initialState.user.userData,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        userData: initialState.user.userData,
        isRequestSent: false,
        isRequestFailed: true,
      };
    case LOGOUT_USER_FAILED:
      return {
        ...state,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case UPDATE_TOKEN_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case UPDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case UPDATE_TOKEN_FAILED:
      return {
        ...state,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        userData: initialState.user.userData,
        isRequestSent: false,
        isRequestFailed: true,
      };

    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        userData: initialState.user.userData,
        isRequestSent: false,
        isRequestFailed: true,
      };
    default:
      return state;
  }
}

const ingredients = (state = initialState.ingredients, action : TIngredientsActions) : TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: [],
        isRequestSent: false,
        isRequestFailed: true,
      };
    default:
      return state;
  }
}

const ingredientDetails = (state = initialState.ingredientDetails, action : TIngredientDetailsActions) : TIngredientDetailsState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_SELECTED:
      return {
        ...state,
        selectedIngredient: action.payload,
      }
    case RESET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: INITIAL_INGREDIENT
      }
    default:
      return state;
  }
}

const order = (state = initialState.order, action : TOrderActions) : TOrderState => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        orderDetails: initialState.order.orderDetails,
        isRequestSent: true,
        isRequestFailed: false,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orderDetails: action.payload,
        isRequestSent: false,
        isRequestFailed: false,
      };
    case PLACE_ORDER_FAILED:
      return {
        ...state,
        orderDetails: initialState.order.orderDetails,
        isRequestSent: false,
        isRequestFailed: true,

      };
    case SWITCH_ORDER_DETAILS_MODAL_STATE:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      }
    default:
      return state;
  }
}

const burgerConstructor = (state = initialState.burgerConstructor, action : TBurgerConstructorActions) : TBurgerConstructorState => {
  switch (action.type) {
    case ADD_TOPPING_TO_CONSTRUCTOR:
      return {
        ...state,
        topping: [...state.topping, action.payload],
      };
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: action.payload,
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        topping: state.topping.filter((ingredient : IIngredient) => ingredient.uuid !== action.payload),
      }
    case UPDATE_TOPPING_ORDER:
      return {
        ...state,
        topping: action.payload,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  socket,
  ingredients,
  ingredientDetails,
  order,
  burgerConstructor,
  user,
});

export default rootReducer;