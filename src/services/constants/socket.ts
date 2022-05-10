const WS_INIT_CONNECTION = 'WS_INIT_CONNECTION';
const WS_ON_OPEN = 'WS_ON_OPEN';
const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
const WS_DISCONNECT = 'WS_DISCONNECT';

const INITIAL_ORDER_MESSAGE = {
  success: false,
  orders: [
    {
      _id: "",
      ingredients: [
        "",
        "",
        "",
        "",
        "",
        ""
      ],
      status: "",
      name: "",
      createdAt: "",
      updatedAt: "",
      number: 0
    }
  ],
  total: 0,
  totalToday: 0
}

export {
  WS_INIT_CONNECTION,
  WS_ON_OPEN,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DISCONNECT,
  INITIAL_ORDER_MESSAGE,
}