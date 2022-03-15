import { combineReducers } from 'redux';
import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGREDIENT_TO_SELECTED, ADD_TOPPING_TO_CONSTRUCTOR,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, RESET_SELECTED_INGREDIENT,
  SWITCH_ORDER_DETAILS_MODAL_STATE, UPDATE_TOPPING_ORDER
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
});

export default rootReducer;