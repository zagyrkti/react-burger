import { Action, ActionCreator, applyMiddleware, compose, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from './reducers';
import { TUserActions } from "./actions/user";
import { TIngredientsActions } from "./actions/ingredients";
import { TIngredientDetailsActions } from "./actions/ingredient-details";
import { TBurgerConstructorActions } from "./actions/burger-constructor";
import { TOrderActions } from "./actions/order";
import { TSocketActions } from "./actions/socket";
import { socketMiddleware } from "./middleware/socket-middleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

const store = createStore(rootReducer, enhancer);

export type TApplicationActions =
    | TUserActions
    | TOrderActions
    | TIngredientsActions
    | TIngredientDetailsActions
    | TBurgerConstructorActions
    | TSocketActions

export type TRootState = ReturnType<typeof store.getState>
export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;
export type TAppDispatch = typeof store.dispatch
export type TAppDispatchWithThunk = typeof store.dispatch | TAppThunk


export default store;