import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';
import { forgotPasswordAction } from '../../services/actions/user';
import { SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";


function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const isPasswordRecoveryEmailSent = useAppSelector((store) => store.user.isPasswordRecoveryEmailSent);

  const forgotPasswordFormInitialState = {
    email: '',
  }

  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    setValues
  } = useForm(forgotPasswordFormInitialState, false);

  const handlePasswordRecovery = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid || !values.email.length) {
      return;
    }

    dispatch(forgotPasswordAction(values.email));
  }

  useEffect(() => {
    if (isPasswordRecoveryEmailSent) {
      navigate('/reset-password')
    }
  }, [isPasswordRecoveryEmailSent])

  return (
      <Registration>
        <form onSubmit={handlePasswordRecovery} noValidate>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={'email'}
                   placeholder={'Укажите e-mail'}
                   onChange={handleChange}
                   value={values.email}
                   name={'email'}
                   size={'default'}
                   errorText={errors.email}
                   error={!isValid && !!values.email.length}
            />
          </div>
          <div className='mt-6'>
            <Button type="primary" size="medium"
                    disabled={!isValid || !values.email.length}
            >Восстановить</Button>
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

export default ForgotPasswordPage;