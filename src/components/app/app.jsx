/*Приветствую*/
/*дедлайн припекал, за 2 дня сделал что мог ))*/

import React from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import {Route, Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import ConstructorPage from "../constructor-page/constructor-page";

function App() {

  const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [ingredientsData, setIngredientsData] = React.useState({buns:[], sauce: [], main: []})

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
        <AppHeader/>
        <Routes>
          <Route path='/' element={<ConstructorPage ingredientsData={ingredientsData}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
