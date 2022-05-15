import {
  WS_INIT_CONNECTION,
  WS_ON_OPEN,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../constants/socket';
import { TOrderData } from "../../shared/types/types";

export interface IWsInitConnectionAction {
  readonly type: typeof WS_INIT_CONNECTION;
  readonly payload: string
}
export interface IWsOnOpenAction {
  readonly type: typeof WS_ON_OPEN;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TOrderData
}
export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: any
}

export type TSocketActions =
    | IWsInitConnectionAction
    | IWsOnOpenAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction