import styles from "../../pages/profile-page/profile-page.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { IObjectKeysWithBoolean } from "../../shared/types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useForm from "../../utils/useForm";
import { getCookie } from "../../utils/cookies-auxiliary";
import { getUserDataAction, updateUserDataAction } from "../../services/actions/user";

interface IInputsDisableStatus extends IObjectKeysWithBoolean {
  name: boolean,
  email: boolean,
}

function ProfileForm() {

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

  const isButtonsShown =
      userData.name !== values.name
      || userData.email !== values.email

  return (
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
  )
}

export default ProfileForm;