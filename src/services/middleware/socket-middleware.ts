import { Middleware, MiddlewareAPI } from "redux";
import { TAppDispatch, TRootState } from "../store";
import {
  WS_INIT_CONNECTION,
  WS_ON_OPEN,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DISCONNECT,
} from '../constants/socket';

export const socketMiddleware = (): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;
    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_INIT_CONNECTION) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_ON_OPEN });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED });
        };

        if (type === WS_DISCONNECT) {
          socket.close();
          dispatch({ type: WS_CONNECTION_CLOSED })
        }

        /*if (type === WS_SEND_MESSAGE) {
          const message = {...payload, token: user.token};
          socket.send(JSON.stringify(message));
        }*/
      }

      next(action);
    };
  };
};