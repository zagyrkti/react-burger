const API_URL = 'https://norma.nomoreparties.space/api/';

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  /*return Promise.reject(`${res.status}`);*/
  return res.json()
      .then((errorRes) => {
        return Promise.reject({status: res.status, ...errorRes})
      })
}

const orderBurger = (burgerIngredientsId, token) => {
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

const getIngredients = () => {
  return fetch(`${API_URL}ingredients`)
      .then(processResponse)
}

const registerRequest = (registerData) => {
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


const loginRequest = (loginData) => {
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

const updateTokenRequest = (token) => {
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

const logoutUserRequest = (token) => {
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

const getUserDataRequest = (token) => {
  return fetch(`${API_URL}auth/user`, {
    headers: {
      'authorization': `Bearer ${token}`,
    }
  })
      .then(processResponse)
};

const updateUserDataRequest = (token, userData) => {
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

const forgotPasswordRequest = (email) => {
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

const resetPasswordRequest = (resetData) => {
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