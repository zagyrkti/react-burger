const orderApi = (burgerIngredientsId) => {
  return fetch('https://norma.nomoreparties.space/api/orders', {
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

export default orderApi;
