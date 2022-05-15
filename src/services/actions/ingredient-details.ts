import {
  ADD_INGREDIENT_TO_SELECTED,
  RESET_SELECTED_INGREDIENT,
} from "../constants/ingredient-details";
import { IIngredient } from "../../shared/types/types";

export interface IAddIngredientToSelectedAction {
  readonly type: typeof ADD_INGREDIENT_TO_SELECTED;
  readonly payload: IIngredient;
}

export interface IResetSelectedIngredientAction {
  readonly type: typeof RESET_SELECTED_INGREDIENT;
}

export type TIngredientDetailsActions =
  | IAddIngredientToSelectedAction
  | IResetSelectedIngredientAction

