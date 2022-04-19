import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';
import { registerUserAction } from '../../services/actions';
import { SyntheticEvent } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { IRegisterData } from "../../shared/types/types";


function RegisterPage() {
  const dispatch = useAppDispatch();

  const registerFormInitialState = {
    name: '',
    email: '',
    password: '',
  }

  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    setValues
  } = useForm<IRegisterData>(registerFormInitialState);


  const handleRegister = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(registerUserAction(values));
  }

  return (
      <Registration>
        <form onSubmit={handleRegister}>
          <h1 className="text text_type_main-medium">Регистрация</h1>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={'text'}
                   placeholder={'Имя'}
                   onChange={handleChange}
                   value={values.name}
                   name={'name'}
                   size={'default'}
            />
          </div>
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
            <Button type="primary" size="medium">Зарегистрироваться</Button>
          </div>

          <RedirectCall className='mt-20'
                        message='Уже зарегистрированы?'
                        toPath='/login'
                        toText='Войти'
          />
        </form>
      </Registration>
  )
}

export default RegisterPage;