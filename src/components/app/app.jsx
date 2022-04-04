import React, { useEffect } from 'react';
import './app.module.css';
import AppHeader from "../app-header/app-header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ConstructorPage from "../../pages/constructor-page/constructor-page";
import {
  getIngredientsAction,
  getUserDataAction,
  RESET_SELECTED_INGREDIENT,
  updateTokenAction
} from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from '../../pages/login-page/login-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import RegisterPage from '../../pages/register-page/register-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import { getCookie } from '../../utils/cookies-auxiliary';


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const userData = useSelector((store) => store.user.userData);
  const isPasswordRecoveryEmailSent = useSelector((store) => store.user.isPasswordRecoveryEmailSent);

  const handleIngredientDetailsClose = () => {
    dispatch({
      type: RESET_SELECTED_INGREDIENT
    })
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getIngredientsAction());
  }, [dispatch])

  const handleLoginByToken = async (token) => {
    await dispatch(updateTokenAction(token))
    dispatch(getUserDataAction(getCookie('token')));
  }

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    if (refreshToken) {
      handleLoginByToken(refreshToken);
    }
  }, [])


  return (
      <>
        <AppHeader />
        <Routes location={location.state?.backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/login' element={
            <ProtectedRoute redirectTo={'/'} passCondition={!userData.name}>
              <LoginPage />
            </ProtectedRoute>
          } />
          <Route path='/register' element={
            <ProtectedRoute redirectTo={'/'} passCondition={!userData.name}>
              <RegisterPage />
            </ProtectedRoute>
          } />
          <Route path='/forgot-password' element={
            <ProtectedRoute redirectTo={'/'} passCondition={!userData.name}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          } />
          <Route path='/reset-password' element={
            <ProtectedRoute redirectTo={'/forgot-password'} passCondition={!userData.name && isPasswordRecoveryEmailSent}>
              <ResetPasswordPage />
            </ProtectedRoute>
          } />
          <Route path='/profile/*' element={
            <ProtectedRoute redirectTo={'/login'} passCondition={!!userData.name}>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
        </Routes>

        {location.state?.backgroundLocation && (
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
