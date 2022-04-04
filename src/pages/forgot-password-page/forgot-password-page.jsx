import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../services/actions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPasswordRecoveryEmailSent = useSelector((store) => store.user.isPasswordRecoveryEmailSent);

  const forgotPasswordFormInitialState = {
    email: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(forgotPasswordFormInitialState);

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();
    dispatch(forgotPasswordAction(values.email));
  }

  useEffect(() => {
    if (isPasswordRecoveryEmailSent) {
      navigate('/reset-password')
    }
  }, [isPasswordRecoveryEmailSent])

  return (
      <Registration>
        <form onSubmit={handlePasswordRecovery}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`mt-6 ${registrationStyles.inputWrapper}`}>
            <Input type={'text'}
                   placeholder={'Укажите e-mail'}
                   onChange={handleChange}
                   value={values.email}
                   name={'email'}
                   size={'default'}
            />
          </div>
          <div className='mt-6'>
            <Button type="primary" size="medium">Восстановить</Button>
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