import styles from './profile-page.module.css';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import { logoutUserAction } from '../../services/actions/user';
import { getCookie } from '../../utils/cookies-auxiliary';
import { useAppDispatch } from "../../hooks/redux";
import { TSetLinkStyle } from "../../shared/types/types";
import ProfileForm from "../../components/profile-form/profile-form";
import OrderHistory from "../../components/order-history/order-history";

function ProfilePage() {
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(logoutUserAction(getCookie('refreshToken')))
  }

  const setLinkStyle: TSetLinkStyle = ({ isActive }) => {
    return isActive
        ? `text text_type_main-medium text_color_primary ${styles.link}`
        : `text text_type_main-medium text_color_inactive ${styles.link}`
  }

  return (
      <main className={styles.main}>
        <section className={styles.profile}>
          <nav className={`${styles.nav}`}>
            <NavLink end to='/profile' className={setLinkStyle}>
              Профиль
            </NavLink>
            <NavLink to='/profile/orders' className={setLinkStyle}>
              История заказов
            </NavLink>
            <NavLink to='/profile/exit' className={setLinkStyle} onClick={handleExit}>
              Выход
            </NavLink>
            <p className={`text text_type_main-default mt-20 text_color_inactive ${styles.remark}`}>
              В этом разделе вы можете
              изменить свои персональные данные</p>
          </nav>
          <Routes>
            <Route path={'/'} element={
              <section className={`${styles.userData} ml-15`}>
                <ProfileForm />
              </section>
            } />
            <Route path={'/orders/*'} element={
              <OrderHistory />
            } />
            <Route path={'/exit'} element={
              <section className={styles.exit}>
                <p className='text text_type_main-medium text_color_inactive'>Выполняется выход</p>
              </section>
            } />
          </Routes>
        </section>
      </main>
  )
}

export default ProfilePage;