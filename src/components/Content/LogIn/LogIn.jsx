import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { authApi }  from '../../../api/api';

let LogInForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field component="input" type="text" name="login" placeholder="Логин" /></div>
      <div><Field component="input" type="password" name="password" placeholder="Пароль" /></div>
      <div>
        <Field component="input" type="checkbox" name="remember_me" id="remember_me" />
        <label htmlFor="remember_me">Запомнить меня</label>
      </div>
      <div><button>Войти</button></div>
    </form>
  );
};

LogInForm = reduxForm({ form: 'log_in' })(LogInForm);

const LogIn = (props) => {
  // ---------------------------------------------------
  const logInFormSubmit = (formData) => {
    authApi.logIn(formData).then(
      (data) => {
        if (!data) { return; }
        if (data.status < 0) {
          console.error(`Auth API: ${data.status} ${data.message}`);
          return;
        }
        return (<Redirect to="/" />);
      }
    );
  };
  // ---------------------------------------------------
  return (
    <div>
      <h1>Вход на сайт</h1>
      <LogInForm onSubmit={logInFormSubmit} />
    </div>
    );
};

export default LogIn;