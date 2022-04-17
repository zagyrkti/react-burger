import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import useForm from '../../utils/useForm';
import RedirectCall from '../../components/redirect-call/redirect-call';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css'
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../services/actions';
import { SyntheticEvent } from "react";
import { ILoginData } from "../../shared/types/types";

function LoginPage() {
  const dispatch = useDispatch();

  const loginFormInitialState = {
    email: '',
    password: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm<ILoginData>(loginFormInitialState);

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(loginUserAction(values));
  }

  return (
      <Registration>
        <form onSubmit={handleLogin}>
          <h1 className="text text_type_main-medium">Вход</h1>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={'text'}
                   placeholder={'E-mail'}
                   onChange={handleChange}
                   value={values.email}
                   name={'email'}
                   size={'default'}
            />
          </div>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <PasswordInput onChange={handleChange}
                           value={values.password}
                           name={'password'}
            />
          </div>
          <div className='mt-6'>
            <Button type="primary" size="medium">Войти</Button>
          </div>

          <RedirectCall className='mt-20'
                        message='Вы — новый пользователь?'
                        toPath='/register'
                        toText='Зарегистрироваться'
          />

          <RedirectCall className='mt-4'
                        message='Забыли пароль?'
                        toPath='/forgot-password'
                        toText='Восстановить пароль'
          />
        </form>
      </Registration>
  )
}

export default LoginPage;