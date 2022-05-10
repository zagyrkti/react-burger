import {
  forgotPasswordRequest,
  getUserDataRequest, loginRequest, logoutUserRequest, registerRequest,
  resetPasswordRequest, updateTokenRequest,
  updateUserDataRequest
} from "../../utils/api";

import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,

  GET_USER_DATA_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,

  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,

  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,

  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,

  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,

  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,

  UPDATE_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS
} from "../constants/user";

import { deleteCookie, getCookie, setCookie } from "../../utils/cookies-auxiliary";
import { ILoginData, IRegisterData, IResetData, IUserData } from "../../shared/types/types";
import { TAppDispatchWithThunk, TAppThunk } from "../store";

export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IGetUserDataFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
}
export interface IGetUserDataRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface IGetUserDataSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: IUserData;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}
export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload: IUserData;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}
export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload: IUserData;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateUserDataFailedAction {
  readonly type: typeof UPDATE_USER_DATA_FAILED;
}
export interface IUpdateUserDataRequestAction {
  readonly type: typeof UPDATE_USER_DATA_REQUEST;
}
export interface IUpdateUserDataSuccessAction {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;
  readonly payload: IUserData;
}

export type TUserActions =
    | IForgotPasswordFailedAction
    | IForgotPasswordRequestAction
    | IForgotPasswordSuccessAction

    | IGetUserDataFailedAction
    | IGetUserDataRequestAction
    | IGetUserDataSuccessAction

    | ILoginUserFailedAction
    | ILoginUserRequestAction
    | ILoginUserSuccessAction

    | ILogoutUserFailedAction
    | ILogoutUserRequestAction
    | ILogoutUserSuccessAction

    | IRegisterUserFailedAction
    | IRegisterUserRequestAction
    | IRegisterUserSuccessAction

    | IResetPasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction

    | IUpdateTokenFailedAction
    | IUpdateTokenRequestAction
    | IUpdateTokenSuccessAction

    | IUpdateUserDataFailedAction
    | IUpdateUserDataRequestAction
    | IUpdateUserDataSuccessAction


const updateTokenAction: TAppThunk = (token : string) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    return updateTokenRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({ type: UPDATE_TOKEN_SUCCESS })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: UPDATE_TOKEN_FAILED });
          console.log(`%cCatch updateTokenAction ${error?.message}`, 'color: red');
        })
  }
};

const registerUserAction: TAppThunk = (registerData : IRegisterData) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: REGISTER_USER_REQUEST })
    registerRequest(registerData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: REGISTER_USER_SUCCESS,
              payload: data.user
            })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: REGISTER_USER_FAILED });
          console.log(`%cCatch registerUserAction ${error?.message}`, 'color: red');
        })

  }
};

const loginUserAction: TAppThunk = (loginData : ILoginData) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: LOGIN_USER_REQUEST })
    loginRequest(loginData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: LOGIN_USER_SUCCESS,
              payload: data.user
            })
            setCookie('token', data.accessToken?.replace('Bearer ', ''), { expires: 1200 });
            setCookie('refreshToken', data.refreshToken, { expires: 60 * 60 * 24 * 30 });
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: LOGIN_USER_FAILED });
          console.log(`%cCatch loginUserAction ${error?.message}`, 'color: red');
        })
  }
};

const resetPasswordAction: TAppThunk = (resetData : IResetData) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: RESET_PASSWORD_REQUEST })
    resetPasswordRequest(resetData)
        .then((data) => {
          if (data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: RESET_PASSWORD_FAILED });
          console.log(`%cCatch resetPasswordAction ${error?.message}`, 'color: red');
        })
  }
};

const forgotPasswordAction: TAppThunk = (email : string) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST })
    return forgotPasswordRequest(email)
        .then((data) => {
          if (data.success) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
          console.log(`%cCatch forgotPasswordAction ${error?.message}`, 'color: red');
        })
  }
};

const updateUserDataAction: TAppThunk = (token : string, userData : IUserData) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: UPDATE_USER_DATA_REQUEST })
    return updateUserDataRequest(token, userData)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: UPDATE_USER_DATA_SUCCESS,
              payload: data.user
            })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch(async (error) => {
          const retryCondition = (error.status === 403 && error.message === 'jwt malformed')
              || (error.status === 403 && error.message === 'jwt expired')

          if (retryCondition && getCookie('refreshToken')) {
            await dispatch(updateTokenAction(getCookie('refreshToken')));
            dispatch(updateUserDataAction(getCookie('token'), userData));
          } else {
            dispatch({ type: UPDATE_USER_DATA_FAILED });
            console.log(`%cCatch getUserDataAction ${error?.message}`, 'color: red');
          }
        })
  }
};

const getUserDataAction: TAppThunk = (token : string) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: GET_USER_DATA_REQUEST })
    return getUserDataRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({
              type: GET_USER_DATA_SUCCESS,
              payload: data.user
            })
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch(async (error) => {
          const retryCondition = (error.status === 403 && error.message === 'jwt malformed')
              || (error.status === 403 && error.message === 'jwt expired')

          if (retryCondition && getCookie('refreshToken')) {
            await dispatch(updateTokenAction(getCookie('refreshToken')));
            dispatch(getUserDataAction(getCookie('token')));
          } else {
            dispatch({ type: GET_USER_DATA_FAILED });
            console.log(`%cCatch getUserDataAction ${error?.message}`, 'color: red');
          }
        })
  }
};

const logoutUserAction: TAppThunk = (token : string) => {
  return function (dispatch: TAppDispatchWithThunk) {
    dispatch({ type: LOGOUT_USER_REQUEST })
    logoutUserRequest(token)
        .then((data) => {
          if (data.success) {
            dispatch({ type: LOGOUT_USER_SUCCESS })
            deleteCookie('token');
            deleteCookie('refreshToken');
          } else {
            return Promise.reject(`${data.success}`);
          }
        })
        .catch((error) => {
          dispatch({ type: LOGOUT_USER_FAILED });
          console.log(`%cCatch logoutUserAction ${error?.message}`, 'color: red');
        })
  }
};

export {
  updateUserDataAction,
  getUserDataAction,
  logoutUserAction,
  updateTokenAction,
  loginUserAction,
  registerUserAction,
  resetPasswordAction,
  forgotPasswordAction
}