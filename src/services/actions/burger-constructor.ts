import {
  ADD_TOPPING_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  UPDATE_TOPPING_ORDER,
} from "../constants/burger-constructor";
import { IIngredient } from "../../shared/types/types";

export interface IAddToppingToConstructorAction {
  readonly type: typeof ADD_TOPPING_TO_CONSTRUCTOR;
  readonly payload: IIngredient
}

export interface IAddBunToConstructorAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: IIngredient
}

export interface IRemoveIngredientFromConstructorAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: string
}

export interface IUpdateToppingOrderAction {
  readonly type: typeof UPDATE_TOPPING_ORDER;
  readonly payload: Array<IIngredient>
}


export type TBurgerConstructorActions =
    | IAddToppingToConstructorAction
    | IAddBunToConstructorAction
    | IRemoveIngredientFromConstructorAction
    | IUpdateToppingOrderAction