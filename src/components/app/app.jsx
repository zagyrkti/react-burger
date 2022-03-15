import React, { useEffect } from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ConstructorPage from "../constructor-page/constructor-page";
import { getIngredientsAction } from '../../services/actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch])

  return (
      <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
