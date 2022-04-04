import { combineReducers } from 'redux';
import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGREDIENT_TO_SELECTED,
  ADD_TOPPING_TO_CONSTRUCTOR, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, GET_USER_DATA_FAILED, GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS, LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS,
  RESET_SELECTED_INGREDIENT,
  SWITCH_ORDER_DETAILS_MODAL_STATE,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOPPING_ORDER, UPDATE_USER_DATA_FAILED, UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS
} from '../actions';

const initialState = {
  ingredients: {
    ingredients: [],
    isRequestSent: false,
    isRequestFailed: false,
  },
  IngredientDetails: {
    selectedIngredient: {},
  },
  order: {
    orderDetails: {
      name: '...loading',
      order: {
        number: null,
      },
      success: false
    },
    isRequestSent: false,
    isRequestFailed: false,
    isModalOpen: false,
  },
  burgerConstructor: {
    bun: {},
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
}

const user = (state = initialState.user, action) => {
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

const ingredients = (state = initialState.ingredients, action) => {
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

const ingredientDetails = (state = initialState.IngredientDetails, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_SELECTED:
      return {
        ...state,
        selectedIngredient: action.payload,
      }
    case RESET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: {}
      }
    default:
      return state;
  }
}

const order = (state = initialState.order, action) => {
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

const burgerConstructor = (state = initialState.burgerConstructor, action) => {
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
        topping: state.topping.filter((ingredient) => ingredient.uuid !== action.payload),
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
  ingredients,
  ingredientDetails,
  order,
  burgerConstructor,
  user,
});

export default rootReducer;