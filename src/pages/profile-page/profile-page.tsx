import styles from './profile-page.module.css';
import { NavLink } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../utils/useForm';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { getUserDataAction, logoutUserAction, updateUserDataAction } from '../../services/actions';
import { getCookie } from '../../utils/cookies-auxiliary';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IObjectKeysWithBoolean, TSetLinkStyle } from "../../shared/types/types";
import OrderList from "../../components/order-list/order-list";

interface IInputsDisableStatus extends IObjectKeysWithBoolean {
  name: boolean,
  email: boolean,
}

function ProfilePage() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((store) => store.user.userData);

  const registerFormInitialState = {
    name: 'debugger',
    email: 'debugger@gmail.com',
    password: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(registerFormInitialState);

  const inputsInitialState = {
    name: true,
    email: true,
  }

  const [inputsDisableStatus, setInputsDisableStatus] = useState<IInputsDisableStatus>(inputsInitialState);

  const handleIconClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget?.parentElement?.children[1].tagName === 'INPUT') {
      const input = event.currentTarget?.parentElement?.children[1] as HTMLInputElement
      const inputName = input.name
      setInputsDisableStatus((prevState) => (
          { ...prevState, [inputName]: !inputsDisableStatus[inputName] })
      )
      setTimeout(() => input.focus(), 0)
    }
  }


  const handleExit = () => {
    dispatch(logoutUserAction(getCookie('refreshToken')))
  }

  const handleGetUserData = () => {
    dispatch(getUserDataAction(getCookie('token')));
  }

  const handleUpdateUserData = (event: SyntheticEvent) => {
    event.preventDefault();

    const updatedUserData = {
      name: values.name,
      email: values.email
    }

    dispatch(updateUserDataAction(getCookie('token'), updatedUserData));
    setInputsDisableStatus(inputsInitialState)
  }

  const handleChancelBtnClick = () => {
    setInputsDisableStatus(inputsInitialState)
    setValues({
      name: userData.name,
      email: userData.email,
      password: '',
    })
  }

  useEffect(() => {
    setValues({
      name: userData.name,
      email: userData.email,
      password: '',
    })
  }, [userData])

  useEffect(() => {
    handleGetUserData();
  }, [])

  const setLinkStyle: TSetLinkStyle = ({ isActive }) => {
    return isActive
        ? `text text_type_main-medium text_color_primary ${styles.link}`
        : `text text_type_main-medium text_color_inactive ${styles.link}`
  }

  const isButtonsShown =
      userData.name !== values.name
      || userData.email !== values.email

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
            <NavLink to='/profile/orders/sdfsdfs' className={setLinkStyle}>
              order details
            </NavLink>
            <p className={`text text_type_main-default mt-20 text_color_inactive ${styles.remark}`}>
              В этом разделе вы можете
              изменить свои персональные данные</p>
          </nav>
          <Routes>
            <Route path={'/'} element={
              <section className={`${styles.userData} ml-15`}>
                <form onSubmit={handleUpdateUserData}>
                  <div className={`${styles.inputWrapper}`}>
                    <Input type={'text'}
                           placeholder={'Имя'}
                           onChange={handleChange}
                           value={values.name}
                           name={'name'}
                           size={'default'}
                           icon={inputsDisableStatus.name ? 'EditIcon' : 'CheckMarkIcon'}
                           onIconClick={handleIconClick}
                           disabled={inputsDisableStatus.name}

                    />
                  </div>
                  <div className={`mt-6 ${styles.inputWrapper}`}>
                    <Input type={'text'}
                           placeholder={'E-mail'}
                           onChange={handleChange}
                           value={values.email}
                           name={'email'}
                           size={'default'}
                           icon={inputsDisableStatus.email ? 'EditIcon' : 'CheckMarkIcon'}
                           onIconClick={handleIconClick}
                           disabled={inputsDisableStatus.email}

                    />
                  </div>
                  <div className={`mt-6 ${styles.inputWrapper}`}>
                    <PasswordInput onChange={handleChange}
                                   value={values.password}
                                   name={'password'}
                    />
                  </div>
                  {isButtonsShown &&
                      <div className={styles.buttons}>
                        <div className='mt-6'>
                          <Button type="secondary" size="medium" htmlType='button'
                                  onClick={handleChancelBtnClick}>Отмена</Button>
                        </div>
                        <div className='mt-6'>
                          <Button type="primary" size="medium">Сохранить</Button>
                        </div>
                      </div>
                  }
                </form>
              </section>
            } />
            <Route path={'/orders'} element={
              <section className={`${styles.orderHistory} mt-9 ml-10 pt-2`}>
                <OrderList orderHistory={true}/>
              </section>
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