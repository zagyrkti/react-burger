import useForm from '../../utils/useForm';
import Registration from '../../components/registration/registration';
import registrationStyles from '../../components/registration/registration.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectCall from '../../components/redirect-call/redirect-call';

function RegisterPage() {
  const registerFormInitialState = {
    name: '',
    email: '',
    password: '',
  }

  const { values, handleChange, resetForm, errors, isValid, setValues } = useForm(registerFormInitialState);

  const handleRegister = (event) => {
    event.preventDefault();
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
            <PasswordInput placeholder={'Пароль'}
                           onChange={handleChange}
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