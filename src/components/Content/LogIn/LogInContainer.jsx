import { connect }       from 'react-redux';
import { authApi }       from '../../../api/api';
import { fetchAuthData } from '../../../redux/auth-reducer';
import LogIn from './LogIn';

const actions         = { fetchAuthData };
const mapStateToProps = (state) => ({ isAuthentificated: state.authData.isAuthentificated });

const LogInApi = (props) => {
  // ---------------------------------------------------
  const logInFormSubmit = (formData) => {
    authApi.logIn(formData).then(
      (data) => {
        if (!data) { return; }
        if (data.status < 0) {
          console.error(`Auth API: ${data.status} ${data.message}`);
          return;
        }
        props.fetchAuthData(true);
      }
    );
  };
  // ---------------------------------------------------
  return (<LogIn {...props} onFormSubmit={logInFormSubmit} />);
};

const LogInContainer = connect(mapStateToProps, actions)(LogInApi);

export default LogInContainer;