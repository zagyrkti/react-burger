import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';
import { useState } from 'react';

function ResetPasswordPage() {
  const resetPasswordFormInitialState = {
    password: '',
    code: '',
  }

  const [visible, setVisible] = useState(false);

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(resetPasswordFormInitialState);

  const handlePasswordReset = (event) => {
    event.preventDefault();
  }

  const handleIconClick = () => {
    setVisible(!visible);
  }

  return (
      <Registration>
        <form onSubmit={handlePasswordReset}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={visible ? 'text' : 'password'}
                   icon={visible ? 'HideIcon' : 'ShowIcon'}
                   onIconClick={handleIconClick}
                   placeholder={'Введите новый пароль'}
                   onChange={handleChange}
                   value={values.password}
                   name={'password'}
                   size={'default'}
            />
          </div>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={'text'}
                   placeholder={'Введите код из письма'}
                   onChange={handleChange}
                   value={values.code}
                   name={'code'}
                   size={'default'}
            />
          </div>

          <div className='mt-6'>
            <Button type="primary" size="medium">Сохранить</Button>
          </div>
          <RedirectCall className='mt-20'
                        message='Вспомнили пароль?'
                        toPath='/login'
                        toText='Войти'
          />
        </form>
      </Registration>
  )
}

export default ResetPasswordPage;