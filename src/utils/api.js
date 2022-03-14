const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';
const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';


const orderBurger = (burgerIngredientsId) => {
  return fetch(ORDER_URL, {
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
  return fetch(INGREDIENTS_URL)
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