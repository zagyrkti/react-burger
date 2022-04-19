import { IIngredient, ILoginData, IRegisterData, IResetData, IUserData } from "../shared/types/types";

const API_URL = 'https://norma.nomoreparties.space/api/';

function processResponse(res: Response) {
  if (res.ok) {
    return res.json();
  }
  /*return Promise.reject(`${res.status}`);*/
  return res.json()
      .then((errorRes) => {
        return Promise.reject({ status: res.status, ...errorRes })
      })
}

interface IOrderBurger {
  success: boolean,
  name: string,
  order: {
    ingredients: Array<IIngredient>,
    _id: string,
    owner: {
      name: string,
      email: string,
      createdAt: string,
      updatedAt: string
    },
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    price: number
  }
}

const orderBurger = (burgerIngredientsId: Array<string>, token: string): Promise<IOrderBurger> => {
  return fetch(`${API_URL}orders`, {
    method: "POST",
    headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: burgerIngredientsId,
    })
  })
      .then(processResponse)
}

interface IGetIngredients {
  success: true,
  data: Array<IIngredient>
}

const getIngredients = (): Promise<IGetIngredients> => {
  return fetch(`${API_URL}ingredients`)
      .then(processResponse)
}

interface IRegisterRequest {
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

const registerRequest = (registerData: IRegisterData): Promise<IRegisterRequest> => {
  return fetch(`${API_URL}auth/register`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...registerData
    })
  })
      .then(processResponse)
}

interface ILoginRequest {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: {
    email: string,
    name: string
  }
}

const loginRequest = (loginData: ILoginData): Promise<ILoginRequest> => {
  return fetch(`${API_URL}auth/login`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...loginData
    })
  })
      .then(processResponse)
}

interface IUpdateTokenRequest {
  success: boolean,
  accessToken: string,
  refreshToken: string
}

const updateTokenRequest = (token: string): Promise<IUpdateTokenRequest> => {
  return fetch(`${API_URL}auth/token`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
      .then(processResponse)
}

interface ILogoutUserRequest {
  success: boolean,
  message: string
}

const logoutUserRequest = (token: string): Promise<ILogoutUserRequest> => {
  return fetch(`${API_URL}auth/logout`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token
    })
  })
      .then(processResponse)
}

interface IGetUserDataRequest {
  success: boolean,
  user: {
    email: string,
    name: string
  }
}

const getUserDataRequest = (token: string): Promise<IGetUserDataRequest> => {
  return fetch(`${API_URL}auth/user`, {
    headers: {
      'authorization': `Bearer ${token}`,
    }
  })
      .then(processResponse)
};

interface IUpdateUserDataRequest {
  success: boolean,
  user: {
    email: string,
    name: string
  }
}

const updateUserDataRequest = (token: string, userData: IUserData): Promise<IUpdateUserDataRequest> => {
  return fetch(`${API_URL}auth/user`, {
    method: "PATCH",
    headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...userData
    })
  })
      .then(processResponse)
};

interface IForgotPasswordRequest {
  success: boolean,
  message: string
}

const forgotPasswordRequest = (email: string): Promise<IForgotPasswordRequest> => {
  return fetch(`${API_URL}password-reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  })
      .then(processResponse)
}

interface IResetPasswordRequest {
  success: boolean,
  message: string
}

const resetPasswordRequest = (resetData: IResetData): Promise<IResetPasswordRequest> => {
  return fetch(`${API_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...resetData
    })
  })
      .then(processResponse)
}

export {
  orderBurger,
  getIngredients,
  registerRequest,
  loginRequest,
  updateTokenRequest,
  logoutUserRequest,
  getUserDataRequest,
  updateUserDataRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
};