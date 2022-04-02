import React, { useEffect } from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import ConstructorPage from "../../pages/constructor-page/constructor-page";
import { getIngredientsAction, RESET_SELECTED_INGREDIENT } from '../../services/actions';
import { useDispatch } from 'react-redux';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import RegisterPage from '../../pages/register-page/register-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';


function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  const state = location.state;

  const handleIngredientDetailsClose = () => {
    dispatch({
      type: RESET_SELECTED_INGREDIENT
    })
  }

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch])

  return (
      <>
        <AppHeader />
        <Routes location={state?.backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/profile/*' element={<ProfilePage />} />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
        </Routes>


        {state?.backgroundLocation && (
            <Routes>
              <Route path="/ingredients/:id" element={
                <Modal onClose={handleIngredientDetailsClose}>
                  <IngredientDetails />
                </Modal>
              } />
            </Routes>
        )}
      </>

  );
}

export default App;
