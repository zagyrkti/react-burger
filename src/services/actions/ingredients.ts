import { getIngredients } from "../../utils/api";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constants/ingredients";
import { IIngredient } from "../../shared/types/types";
import { TAppDispatchWithThunk, TAppThunk } from "../store";


export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: Array<IIngredient>
}

export type TIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsFailedAction
    | IGetIngredientsSuccessAction

const getIngredientsAction: TAppThunk = () => {
  return function (dispatch: TAppDispatchWithThunk) {
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

export {
  getIngredientsAction,
}