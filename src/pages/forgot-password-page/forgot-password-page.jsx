import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';

function ForgotPasswordPage() {
  const forgotPasswordFormInitialState = {
    email: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(forgotPasswordFormInitialState);

  const handlePasswordRecovery = (event) => {
    event.preventDefault();
  }

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