import styles from './profile-page.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../utils/useForm';
import { useState } from 'react';

function ProfilePage() {

  const location = useLocation();
  ;debugger

  const registerFormInitialState = {
    name: 'debugger',
    email: 'debugger@gmail.com',
    password: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(registerFormInitialState);

  const [inputsDisableStatus, setInputsDisableStatus] = useState({
    name: true,
    email: true,
  });

  const handleIconClick = (event) => {
    const input = event.currentTarget.parentElement.children[1];
    const inputName = input.name
    setInputsDisableStatus((prevState) => (
        { ...prevState, [inputName]: !inputsDisableStatus[inputName] })
    )
    setTimeout(() => input.focus(), 0)
  }

  const handleUserDataUpdate = (event) => {
    event.preventDefault();
  }

  const setLinkStyle = ({ isActive }) => {
    return isActive
        ? `text text_type_main-medium text_color_primary ${styles.link}`
        : `text text_type_main-medium text_color_inactive ${styles.link}`
  }

  const isButtonsShown =
      registerFormInitialState.name !== values.name
      || registerFormInitialState.email !== values.email

  return (
      <main className={styles.main}>
        <section className={styles.profile}>
          <nav className={`${styles.nav} mr-15`}>
            <NavLink end to='/profile' className={setLinkStyle}>
              Профиль
            </NavLink>
            <NavLink to='/profile/orders' className={setLinkStyle}>
              История заказов
            </NavLink>
            <NavLink to='/profile/exit' className={setLinkStyle}>
              Выход
            </NavLink>
            <p className={`text text_type_main-default mt-20 text_color_inactive ${styles.remark}`}>
              В этом разделе вы можете
              изменить свои персональные данные</p>
          </nav>
          <Routes>
            <Route path={'/'} element={
              <section className={styles.userData}>
                <form onSubmit={handleUserDataUpdate}>
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
                    <PasswordInput placeholder={'Пароль'}
                                   onChange={handleChange}
                                   value={values.password}
                                   name={'password'}
                    />
                  </div>
                  {isButtonsShown &&
                      <div className={styles.buttons}>
                        <div className='mt-6'>
                          <Button type="secondary" size="medium">Отмена</Button>
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
              <p>
                orders
              </p>
            } />
            <Route path={'/exit'} element={
              <p>
                exit
              </p>
            } />
          </Routes>
        </section>
      </main>
  )
}

export default ProfilePage;