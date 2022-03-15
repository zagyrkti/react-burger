const API_URL = 'https://norma.nomoreparties.space/api/';

const orderBurger = (burgerIngredientsId) => {
  return fetch(`${API_URL}orders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: burgerIngredientsId,
    })
  })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}

const getIngredients = () => {
  return fetch(`${API_URL}ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
}

export {
  orderBurger,
  getIngredients,
};