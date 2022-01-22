import React from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import {Route, Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import ConstructorPage from "../constructor-page/constructor-page";
import BurgerConstructorContext from '../../contexts/burger-constructor-context';

function App() {

  const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredientsData, setIngredientsData] = React.useState({buns:[], sauce: [], main: []})
  const [burgerIngredients, setBurgerIngredients] = React.useState([]);

  const randomBurger = [];
  function randomIngredients(requiredAmount, ingredients) {
    for (let i = 0; i < requiredAmount; i++) {
      randomBurger.push(ingredients[Math.floor(Math.random() * ingredients.length)])
    }
  }

  const processIngredientsData = (data) => {
    const buns = [];
    const sauce = [];
    const main = [];

    data.forEach((ingredient) => {
      switch (ingredient.type) {
        case 'main':
          main.push(ingredient);
          break
        case 'sauce':
          sauce.push(ingredient);
          break
        case 'bun':
          buns.push(ingredient);
          break;
        default:
          console.log('ingredients switch fail')
      }
    })

    randomIngredients(1, buns);
    randomIngredients(2, sauce);
    randomIngredients(4, main);
    setBurgerIngredients(randomBurger);

    return {buns, sauce, main};
  }



  React.useEffect(() => {
    fetch(INGREDIENTS_URL)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
          const processedRes = processIngredientsData(res.data)
          setIngredientsData(processedRes);
        })
        .catch(console.log)
  }, [])


  return (
      <BrowserRouter>
        <BurgerConstructorContext.Provider value={burgerIngredients}>
        <AppHeader/>
        <Routes>
          <Route path='/' element={<ConstructorPage ingredientsData={ingredientsData}/>}/>
        </Routes>
        </BurgerConstructorContext.Provider>
      </BrowserRouter>
  );
}

export default App;
