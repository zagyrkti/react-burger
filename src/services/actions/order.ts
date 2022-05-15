import { IOrderBurger, orderBurger } from "../../utils/api";
import { getCookie } from "../../utils/cookies-auxiliary";
import { updateTokenAction } from "./user";
import {
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  SWITCH_ORDER_DETAILS_MODAL_STATE
} from "../constants/order";
import { TAppDispatchWithThunk, TAppThunk } from "../store";

export interface IPlaceOrderRequestAction {
  readonly type: typeof PLACE_ORDER_REQUEST;
}

export interface IPlaceOrderSuccessAction {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly payload: IOrderBurger
}

export interface IPlaceOrderFailedAction {
  readonly type: typeof PLACE_ORDER_FAILED;
}

export interface ISwitchOrderDetailsModalStateAction {
  readonly type: typeof SWITCH_ORDER_DETAILS_MODAL_STATE;
}

export type TOrderActions =
    | IPlaceOrderRequestAction
    | IPlaceOrderSuccessAction
    | IPlaceOrderFailedAction
    | ISwitchOrderDetailsModalStateAction

const placeOrderAction: TAppThunk = (idList: Array<string | number>, token: string) => {
  return function (dispatch: TAppDispatchWithThunk) {
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



export {
  placeOrderAction,
}